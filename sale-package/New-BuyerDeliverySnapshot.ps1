[CmdletBinding()]
param(
    [string]$Tag = 'cyberready-acquisition-v1.0',
    [Parameter(Mandatory = $true)]
    [string]$OutputDirectory,
    [ValidateSet('SellerReview', 'BuyerDelivery')]
    [string]$Mode = 'SellerReview',
    [switch]$IncludeControlledRuntimeReferenceContent
)

<#
Creates a clean, tag-based source archive for seller review or an approved buyer
delivery. It never copies the seller working directory and `git archive` never
includes `.git` history. Do not use BuyerDelivery mode until counsel/owner has
approved treatment of the active NIST AI RMF Playbook source content.

Examples:
  .\sale-package\New-BuyerDeliverySnapshot.ps1 -OutputDirectory C:\Delivery\Review
  .\sale-package\New-BuyerDeliverySnapshot.ps1 -OutputDirectory C:\Delivery\Buyer -Mode BuyerDelivery -IncludeControlledRuntimeReferenceContent
#>

$ErrorActionPreference = 'Stop'
$repoRoot = (Resolve-Path (Join-Path $PSScriptRoot '..')).Path
$outputRoot = (Resolve-Path -LiteralPath $OutputDirectory).Path

$tagCommit = (& git -C $repoRoot rev-parse "$Tag^{commit}").Trim()
if ($LASTEXITCODE -ne 0 -or -not $tagCommit) {
    throw "Tag '$Tag' does not resolve to a commit in $repoRoot."
}

if ($Mode -eq 'BuyerDelivery' -and -not $IncludeControlledRuntimeReferenceContent) {
    throw "BuyerDelivery mode requires -IncludeControlledRuntimeReferenceContent because aiRmfPlaybook.js is active runtime source and remains a counsel-review external-reference item. Do not use the switch until owner/counsel approves the delivery treatment."
}

$shortCommit = $tagCommit.Substring(0, 12)
$packageName = "CyberReady-Buyer-Delivery-$shortCommit"
$reviewRoot = Join-Path $outputRoot $packageName
$zipPath = Join-Path $outputRoot "$packageName.zip"
if (Test-Path -LiteralPath $reviewRoot -or Test-Path -LiteralPath $zipPath) {
    throw "Refusing to overwrite an existing delivery path: $reviewRoot or $zipPath"
}

$tempArchive = Join-Path ([System.IO.Path]::GetTempPath()) ("$packageName-" + [guid]::NewGuid().ToString() + '.zip')
try {
    & git -C $repoRoot archive --format=zip "--output=$tempArchive" $tagCommit
    if ($LASTEXITCODE -ne 0 -or -not (Test-Path -LiteralPath $tempArchive)) {
        throw 'git archive failed; no buyer delivery was created.'
    }

    Expand-Archive -LiteralPath $tempArchive -DestinationPath $reviewRoot -Force

    # Static, reviewed exclusions only. Paths are resolved beneath the new archive
    # before removal; this script never deletes from the seller repository.
    $excludedPaths = @(
        '.git', '.env', '.env.local', '.env.development.local', '.env.test.local', '.env.production.local',
        'ACQUISITION_OWNER_DECISION_MEMO.md',
        'ACQUISITION_PROVENANCE_EVIDENCE_REGISTER.md',
        'ACQUISITION_PROVENANCE_REVIEW_REPORT.md',
        'ACQUISITION_IP_PROVENANCE_MATRIX.md',
        'CCRE_COSN_TERMINOLOGY_AUDIT.md',
        'CONTROLLED_DILIGENCE_INDEX.md',
        'FINAL_DILIGENCE_REVIEW.md',
        'PRE_MERGE_ACQUISITION_OWNER_CHECKLIST.md',
        'PRE_MERGE_ACQUISITION_FREEZE_REPORT.md',
        'SECURITY_REVIEW.md',
        'WEBSITE_ASSET_PROVENANCE.md',
        'hall-monitor/client/src/data/rubricData.js',
        'hall-monitor/client/src/data/cybersecurityAssessment.json',
        'hall-monitor/client/src/data/assessmentGuidance.js',
        'hall-monitor/server/report-generator.js'
    )

    $rootFullPath = [System.IO.Path]::GetFullPath($reviewRoot)
    foreach ($relativePath in $excludedPaths) {
        $candidate = [System.IO.Path]::GetFullPath((Join-Path $reviewRoot $relativePath))
        if (-not $candidate.StartsWith($rootFullPath + [System.IO.Path]::DirectorySeparatorChar, [System.StringComparison]::OrdinalIgnoreCase)) {
            throw "Unsafe exclusion path refused: $relativePath"
        }
        if (Test-Path -LiteralPath $candidate) {
            Remove-Item -LiteralPath $candidate -Recurse -Force
        }
    }

    if ($Mode -eq 'SellerReview') {
        @"
# SELLER REVIEW COPY — NOT YET APPROVED FOR BUYER DELIVERY

Source tag: `$Tag`
Commit: `$tagCommit`

This copy was generated from a Git archive and excludes `.git`, seller-local
configuration, legacy cybersecurity-rubric source files, and identified
counsel-only documentation. The active `hall-monitor/client/src/data/aiRmfPlaybook.js`
remains in this review copy because the current UI imports it. It is external
reference content, not a seller-owned asset, and must not be delivered to a
buyer unless the owner/counsel has approved its specific treatment.
"@ | Set-Content -LiteralPath (Join-Path $reviewRoot 'SELLER_REVIEW_ONLY.md') -NoNewline
    }
    else {
        Remove-Item -LiteralPath (Join-Path $reviewRoot 'SELLER_REVIEW_ONLY.md') -Force -ErrorAction SilentlyContinue
    }

    $requiredPaths = @(
        'README.md', 'DEMO_SETUP.md', 'DEPLOYMENT.md', 'ACQUISITION_TECHNICAL_FREEZE.md',
        'hall-monitor/server/index.js', 'hall-monitor/client/src', 'hall-monitor/package-lock.json',
        'hall-monitor/client/package-lock.json', 'website/src', 'website/package-lock.json'
    )
    foreach ($relativePath in $requiredPaths) {
        if (-not (Test-Path -LiteralPath (Join-Path $reviewRoot $relativePath))) {
            throw "Required delivery content is missing after exclusions: $relativePath"
        }
    }

    @"
# Delivery Snapshot Metadata

- Source tag: `$Tag`
- Source commit: `$tagCommit`
- Generated mode: `$Mode`
- Generated at: $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss K')
- Git history: excluded by `git archive`
- Hosting: buyer recreates hosting in a buyer-controlled environment
- Domain: `cyberreadyschools.com` is intended to transfer separately through approved domain-transfer procedures
- Seller email accounts: excluded
- Seller social accounts: none represented for transfer

See `BUYER_DELIVERY_MANIFEST.md` in the seller repository for the approved
transaction boundary. This snapshot is not legal clearance.
"@ | Set-Content -LiteralPath (Join-Path $reviewRoot 'DELIVERY_SNAPSHOT_METADATA.md') -NoNewline

    Compress-Archive -LiteralPath $reviewRoot -DestinationPath $zipPath -CompressionLevel Optimal
    Write-Output "Created $Mode package: $zipPath"
    Write-Output "Retained inspection copy: $reviewRoot"
}
finally {
    if (Test-Path -LiteralPath $tempArchive) {
        Remove-Item -LiteralPath $tempArchive -Force
    }
}

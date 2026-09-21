/**
 * Cybersecurity Assessment Report Generator
 * Generates a Word document from the implemented assessment-report workflow.
 */
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  Header, Footer, AlignmentType, HeadingLevel, BorderStyle, WidthType,
  ShadingType, PageBreak, PageNumber, LevelFormat,
} = require('docx');

const MATURITY_LABELS = {
  1: 'Initial',
  2: 'Developing',
  3: 'Defined',
  4: 'Managed',
  5: 'Optimized',
};

// The 22 CCRE categories organized by NIST function
const CCRE_STRUCTURE = [
  {
    num: '1.0', key: 'GOVERN', name: 'Govern', categories: [
      { num: '1.1', code: 'GV.OC', name: 'Organizational Context' },
      { num: '1.2', code: 'GV.RM', name: 'Risk Management Strategy' },
      { num: '1.3', code: 'GV.RR', name: 'Roles, Responsibilities, and Authorities' },
      { num: '1.4', code: 'GV.PO', name: 'Policy' },
      { num: '1.5', code: 'GV.OV', name: 'Oversight' },
      { num: '1.6', code: 'GV.SC', name: 'Cybersecurity Supply Chain Risk Management' },
    ],
  },
  {
    num: '2.0', key: 'IDENTIFY', name: 'Identify', categories: [
      { num: '2.1', code: 'ID.AM', name: 'Asset Management' },
      { num: '2.2', code: 'ID.RA', name: 'Risk Assessment' },
      { num: '2.3', code: 'ID.IM', name: 'Improvement' },
    ],
  },
  {
    num: '3.0', key: 'PROTECT', name: 'Protect', categories: [
      { num: '3.1', code: 'PR.AA', name: 'Identity Management, Authentication, and Access Control' },
      { num: '3.2', code: 'PR.AT', name: 'Awareness and Training' },
      { num: '3.3', code: 'PR.DS', name: 'Data Security' },
      { num: '3.4', code: 'PR.PS', name: 'Platform Security' },
      { num: '3.5', code: 'PR.IR', name: 'Technology Infrastructure Resilience' },
    ],
  },
  {
    num: '4.0', key: 'DETECT', name: 'Detect', categories: [
      { num: '4.1', code: 'DE.CM', name: 'Continuous Monitoring' },
      { num: '4.2', code: 'DE.AE', name: 'Adverse Event Analysis' },
    ],
  },
  {
    num: '5.0', key: 'RESPOND', name: 'Respond', categories: [
      { num: '5.1', code: 'RS.MA', name: 'Incident Management' },
      { num: '5.2', code: 'RS.AN', name: 'Incident Analysis' },
      { num: '5.3', code: 'RS.CO', name: 'Incident Response Reporting and Communication' },
      { num: '5.4', code: 'RS.MI', name: 'Incident Mitigation' },
    ],
  },
  {
    num: '6.0', key: 'RECOVER', name: 'Recover', categories: [
      { num: '6.1', code: 'RC.RP', name: 'Incident Recovery Plan Execution' },
      { num: '6.2', code: 'RC.CO', name: 'Incident Recovery Communication' },
    ],
  },
];

function maturityLabel(level) {
  if (!level) return 'Not Rated';
  return `Level ${level}: ${MATURITY_LABELS[level] || 'Unknown'}`;
}

function functionAverage(ratings, funcKey) {
  const funcRatings = Object.entries(ratings)
    .filter(([k]) => k.startsWith(funcKey + '::'))
    .map(([, v]) => v.level)
    .filter(Boolean);
  if (funcRatings.length === 0) return null;
  return Math.round(funcRatings.reduce((s, l) => s + l, 0) / funcRatings.length * 10) / 10;
}

function overallAverage(ratings) {
  const allLevels = Object.values(ratings).map(r => r.level).filter(Boolean);
  if (allLevels.length === 0) return null;
  return Math.round(allLevels.reduce((s, l) => s + l, 0) / allLevels.length * 10) / 10;
}

function overallMaturityLabel(avg) {
  if (!avg) return 'Not Rated';
  if (avg >= 4.5) return 'Level 5: Optimized';
  if (avg >= 3.5) return 'Level 4: Managed';
  if (avg >= 2.5) return 'Level 3: Defined';
  if (avg >= 1.5) return 'Level 2: Developing';
  return 'Level 1: Initial';
}

// ── Table helpers ──────────────────────────────────────────────
const border = { style: BorderStyle.SINGLE, size: 1, color: '999999' };
const borders = { top: border, bottom: border, left: border, right: border };
const cellMargins = { top: 60, bottom: 60, left: 100, right: 100 };
const headerShading = { fill: '1F4E79', type: ShadingType.CLEAR };
const altShading = { fill: 'F2F7FB', type: ShadingType.CLEAR };

function headerCell(text, width) {
  return new TableCell({
    borders, width: { size: width, type: WidthType.DXA },
    shading: headerShading, margins: cellMargins,
    children: [new Paragraph({
      children: [new TextRun({ text, bold: true, color: 'FFFFFF', font: 'Arial', size: 20 })],
    })],
  });
}

function dataCell(text, width, shading) {
  const opts = { borders, width: { size: width, type: WidthType.DXA }, margins: cellMargins, children: [
    new Paragraph({ children: [new TextRun({ text: text || '\u2014', font: 'Arial', size: 20 })] }),
  ]};
  if (shading) opts.shading = shading;
  return new TableCell(opts);
}

function maturityTable(ratings, funcKey, categories) {
  const rows = [
    new TableRow({ children: [headerCell('Category', 6000), headerCell('Rating', 3360)] }),
  ];
  categories.forEach((cat, i) => {
    const ratingKey = `${funcKey}::${cat.name.toUpperCase()}`;
    const r = ratings[ratingKey];
    const level = r ? r.level : null;
    const sh = i % 2 === 1 ? altShading : undefined;
    rows.push(new TableRow({
      children: [dataCell(cat.name, 6000, sh), dataCell(maturityLabel(level), 3360, sh)],
    }));
  });
  return new Table({
    width: { size: 9360, type: WidthType.DXA },
    columnWidths: [6000, 3360],
    rows,
  });
}

// ── Main generator ─────────────────────────────────────────────
async function generateCCREReport({ district, assessment, ratings, auditorName, selfAssessmentRatings }) {
  const schoolName = district.name;
  const now = new Date();
  const dateStr = now.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  const yearStr = String(now.getFullYear());

  // Build ratings lookup: { "GOVERN::ORGANIZATIONAL CONTEXT": { level: 3, evidence: "...", notes: "..." } }
  const ratingsMap = {};
  (ratings || []).forEach(r => {
    ratingsMap[`${r.nist_function}::${r.category}`] = r;
  });

  const selfMap = selfAssessmentRatings || {};
  const overall = overallAverage(ratingsMap);
  const overallLabel = overallMaturityLabel(overall);

  const children = [];

  // ── COVER PAGE ───────────────────────────────────────────────
  children.push(
    new Paragraph({ spacing: { before: 3000 }, children: [] }),
    new Paragraph({
      alignment: AlignmentType.CENTER, spacing: { after: 200 },
      children: [new TextRun({ text: yearStr, bold: true, size: 56, font: 'Arial', color: '1F4E79' })],
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER, spacing: { after: 400 },
      children: [new TextRun({ text: schoolName, bold: true, size: 40, font: 'Arial', color: '1F4E79' })],
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER, spacing: { after: 200 },
      children: [new TextRun({ text: 'CyberReady Cybersecurity Assessment Report', size: 32, font: 'Arial', color: '333333' })],
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER, spacing: { after: 600 },
      children: [new TextRun({ text: `Prepared by ${auditorName} \u2022 CyberReady`, size: 22, font: 'Arial', color: '666666' })],
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER, spacing: { after: 200 },
      children: [new TextRun({ text: `Report Date: ${dateStr}`, size: 22, font: 'Arial', color: '666666' })],
    }),
    new Paragraph({ children: [new PageBreak()] }),
  );

  // ── EXECUTIVE LETTER ─────────────────────────────────────────
  children.push(
    new Paragraph({
      heading: HeadingLevel.HEADING_1, spacing: { after: 200 },
      children: [new TextRun({ text: 'EXECUTIVE LETTER', bold: true, size: 28, font: 'Arial', color: '1F4E79' })],
    }),
    new Paragraph({
      spacing: { after: 200 },
      children: [new TextRun({
        text: `A CyberReady cybersecurity assessment was completed for ${schoolName}. The assessment maps results to the cybersecurity framework functions and objectives outlined below.`,
        size: 22, font: 'Arial',
      })],
    }),
    new Paragraph({
      heading: HeadingLevel.HEADING_2, spacing: { before: 300, after: 150 },
      children: [new TextRun({ text: 'Evaluation Objectives', bold: true, size: 24, font: 'Arial', color: '1F4E79' })],
    }),
    new Paragraph({
      spacing: { after: 100 },
      children: [new TextRun({
        text: `Objectively review ${schoolName}\u2019s self-assessment results using the Cybersecurity Rubric.`,
        size: 22, font: 'Arial',
      })],
    }),
    new Paragraph({
      spacing: { after: 100 },
      children: [new TextRun({
        text: `Evaluate ${schoolName}\u2019s current cybersecurity practices and gauge their level of cybersecurity maturity across the six NIST functions: Govern, Identify, Protect, Detect, Respond, and Recover.`,
        size: 22, font: 'Arial',
      })],
    }),
    new Paragraph({
      spacing: { after: 200 },
      children: [new TextRun({
        text: `Prepare a Cybersecurity Rubric review report that provides feedback about current cybersecurity maturity levels to help ${schoolName} gauge their current state\u2019s effectiveness and identify improvement opportunities to support continuous improvement and the strategic planning process.`,
        size: 22, font: 'Arial',
      })],
    }),
  );

  // Key finding summary
  const strongFunctions = CCRE_STRUCTURE.filter(f => {
    const avg = functionAverage(ratingsMap, f.key);
    return avg && avg >= 3;
  }).map(f => f.name);
  const weakFunctions = CCRE_STRUCTURE.filter(f => {
    const avg = functionAverage(ratingsMap, f.key);
    return avg && avg < 2.5;
  }).map(f => f.name);

  let findingSummary = `Based on the evaluation, ${schoolName} achieved an overall maturity rating of ${overallLabel}.`;
  if (strongFunctions.length > 0) {
    findingSummary += ` Commendable performance was noted in ${strongFunctions.join(', ')}.`;
  }
  if (weakFunctions.length > 0) {
    findingSummary += ` Key opportunities for improvement were identified in ${weakFunctions.join(', ')}.`;
  }

  children.push(
    new Paragraph({
      spacing: { before: 200, after: 200 },
      children: [new TextRun({ text: findingSummary, size: 22, font: 'Arial' })],
    }),
    new Paragraph({ children: [new PageBreak()] }),
  );

  // ── SELF-ASSESSMENT MATURITY RATING ──────────────────────────
  const selfOverall = overallAverage(selfMap);
  children.push(
    new Paragraph({
      heading: HeadingLevel.HEADING_1, spacing: { after: 200 },
      children: [new TextRun({ text: `SELF-ASSESSMENT MATURITY RATING: ${overallMaturityLabel(selfOverall)}`, bold: true, size: 28, font: 'Arial', color: '1F4E79' })],
    }),
    new Paragraph({
      spacing: { after: 200 },
      children: [new TextRun({ text: `The following tables represent ${schoolName}\u2019s self-assessment maturity level scores for each category as reported by district personnel.`, size: 22, font: 'Arial' })],
    }),
  );

  CCRE_STRUCTURE.forEach(func => {
    const funcAvg = functionAverage(selfMap, func.key);
    children.push(
      new Paragraph({
        heading: HeadingLevel.HEADING_2, spacing: { before: 250, after: 150 },
        children: [new TextRun({ text: `${func.name} Maturity Rating: ${overallMaturityLabel(funcAvg)}`, bold: true, size: 24, font: 'Arial', color: '1F4E79' })],
      }),
      maturityTable(selfMap, func.key, func.categories),
      new Paragraph({ spacing: { after: 100 }, children: [] }),
    );
  });

  children.push(new Paragraph({ children: [new PageBreak()] }));

  // ── CCRE MATURITY RATING ─────────────────────────────────────
  children.push(
    new Paragraph({
      heading: HeadingLevel.HEADING_1, spacing: { after: 200 },
      children: [new TextRun({ text: `CCRE MATURITY RATING: ${overallLabel}`, bold: true, size: 28, font: 'Arial', color: '1F4E79' })],
    }),
    new Paragraph({
      spacing: { after: 200 },
      children: [new TextRun({ text: `The following tables represent cybersecurity assessment maturity-level ratings based on evidence review, interviews, and verification of ${schoolName}\u2019s cybersecurity practices.`, size: 22, font: 'Arial' })],
    }),
  );

  CCRE_STRUCTURE.forEach(func => {
    const funcAvg = functionAverage(ratingsMap, func.key);
    children.push(
      new Paragraph({
        heading: HeadingLevel.HEADING_2, spacing: { before: 250, after: 150 },
        children: [new TextRun({ text: `${func.name} Maturity Rating: ${overallMaturityLabel(funcAvg)}`, bold: true, size: 24, font: 'Arial', color: '1F4E79' })],
      }),
      maturityTable(ratingsMap, func.key, func.categories),
      new Paragraph({ spacing: { after: 100 }, children: [] }),
    );
  });

  children.push(new Paragraph({ children: [new PageBreak()] }));

  // ── FINDINGS ─────────────────────────────────────────────────
  children.push(
    new Paragraph({
      heading: HeadingLevel.HEADING_1, spacing: { after: 200 },
      children: [new TextRun({ text: 'FINDINGS', bold: true, size: 28, font: 'Arial', color: '1F4E79' })],
    }),
    new Paragraph({
      spacing: { after: 200 },
      children: [new TextRun({
        text: 'Findings are the specific and detailed results of the CR review. They are based on evidence about how the school measures up against the Cybersecurity Rubric.',
        size: 22, font: 'Arial',
      })],
    }),
  );

  // Commendations
  children.push(
    new Paragraph({
      heading: HeadingLevel.HEADING_2, spacing: { before: 250, after: 150 },
      children: [new TextRun({ text: 'Commendations', bold: true, size: 24, font: 'Arial', color: '1F4E79' })],
    }),
  );
  const commendations = [];
  Object.entries(ratingsMap).forEach(([key, r]) => {
    if (r.level >= 3 && r.evidence) {
      const parts = key.split('::');
      commendations.push(`${parts[1]}: ${r.evidence}`);
    }
  });
  if (commendations.length > 0) {
    commendations.forEach(c => {
      children.push(new Paragraph({
        spacing: { after: 80 },
        children: [new TextRun({ text: `\u2022 ${c}`, size: 22, font: 'Arial' })],
      }));
    });
  } else {
    children.push(new Paragraph({
      spacing: { after: 100 },
      children: [new TextRun({ text: 'No commendations documented in this evaluation cycle.', italics: true, size: 22, font: 'Arial', color: '666666' })],
    }));
  }

  // Opportunities for Improvement
  children.push(
    new Paragraph({
      heading: HeadingLevel.HEADING_2, spacing: { before: 250, after: 150 },
      children: [new TextRun({ text: 'Opportunities for Improvement', bold: true, size: 24, font: 'Arial', color: '1F4E79' })],
    }),
  );
  const ofis = [];
  Object.entries(ratingsMap).forEach(([key, r]) => {
    if (r.level && r.level < 3 && r.notes) {
      const parts = key.split('::');
      ofis.push(`${parts[1]}: ${r.notes}`);
    }
  });
  if (ofis.length > 0) {
    ofis.forEach(o => {
      children.push(new Paragraph({
        spacing: { after: 80 },
        children: [new TextRun({ text: `\u2022 ${o}`, size: 22, font: 'Arial' })],
      }));
    });
  } else {
    children.push(new Paragraph({
      spacing: { after: 100 },
      children: [new TextRun({ text: 'No specific opportunities for improvement documented.', italics: true, size: 22, font: 'Arial', color: '666666' })],
    }));
  }

  children.push(new Paragraph({ children: [new PageBreak()] }));

  // ── DETAILED CATEGORY RATINGS ────────────────────────────────
  CCRE_STRUCTURE.forEach(func => {
    const selfFuncAvg = functionAverage(selfMap, func.key);
    const ccreFuncAvg = functionAverage(ratingsMap, func.key);

    children.push(
      new Paragraph({
        heading: HeadingLevel.HEADING_1, spacing: { after: 100 },
        children: [new TextRun({ text: `${func.num} ${func.name} Function Maturity Ratings`, bold: true, size: 28, font: 'Arial', color: '1F4E79' })],
      }),
      new Paragraph({
        spacing: { after: 80 },
        children: [
          new TextRun({ text: `Self-Assessment Maturity Level: `, bold: true, size: 22, font: 'Arial' }),
          new TextRun({ text: overallMaturityLabel(selfFuncAvg), size: 22, font: 'Arial' }),
        ],
      }),
      new Paragraph({
        spacing: { after: 200 },
        children: [
          new TextRun({ text: `CCRE Maturity Level: `, bold: true, size: 22, font: 'Arial' }),
          new TextRun({ text: overallMaturityLabel(ccreFuncAvg), size: 22, font: 'Arial' }),
        ],
      }),
    );

    func.categories.forEach(cat => {
      const rKey = `${func.key}::${cat.name.toUpperCase()}`;
      const r = ratingsMap[rKey];

      children.push(
        new Paragraph({
          heading: HeadingLevel.HEADING_2, spacing: { before: 200, after: 100 },
          children: [new TextRun({ text: `${cat.num} ${cat.name} (${cat.code})`, bold: true, size: 24, font: 'Arial', color: '1F4E79' })],
        }),
        new Paragraph({
          spacing: { after: 60 },
          children: [
            new TextRun({ text: 'CCRE Rating: ', bold: true, size: 22, font: 'Arial' }),
            new TextRun({ text: r ? maturityLabel(r.level) : 'Not Rated', size: 22, font: 'Arial' }),
          ],
        }),
      );

      if (r && r.evidence) {
        children.push(new Paragraph({
          spacing: { after: 60 },
          children: [
            new TextRun({ text: 'Evidence: ', bold: true, size: 22, font: 'Arial' }),
            new TextRun({ text: r.evidence, size: 22, font: 'Arial' }),
          ],
        }));
      }
      if (r && r.notes) {
        children.push(new Paragraph({
          spacing: { after: 60 },
          children: [
            new TextRun({ text: 'Notes: ', bold: true, size: 22, font: 'Arial' }),
            new TextRun({ text: r.notes, size: 22, font: 'Arial' }),
          ],
        }));
      }
      if (!r || (!r.evidence && !r.notes)) {
        children.push(new Paragraph({
          spacing: { after: 60 },
          children: [new TextRun({ text: 'Detailed findings to be documented.', italics: true, size: 22, font: 'Arial', color: '666666' })],
        }));
      }
    });

    children.push(new Paragraph({ spacing: { after: 200 }, children: [] }));
  });

  // ── EVALUATION SUMMARY ───────────────────────────────────────
  children.push(
    new Paragraph({ children: [new PageBreak()] }),
    new Paragraph({
      heading: HeadingLevel.HEADING_1, spacing: { after: 200 },
      children: [new TextRun({ text: 'EVALUATION SUMMARY', bold: true, size: 28, font: 'Arial', color: '1F4E79' })],
    }),
    new Paragraph({
      spacing: { after: 200 },
      children: [new TextRun({
        text: `The Cybersecurity Rubric Evaluation of ${schoolName} has been completed. The overall CCRE maturity rating is ${overallLabel}. ` +
          (strongFunctions.length > 0 ? `The district demonstrated strong practices in ${strongFunctions.join(', ')}. ` : '') +
          (weakFunctions.length > 0 ? `Priority improvement areas include ${weakFunctions.join(', ')}. ` : '') +
          `${schoolName} is encouraged to use these findings as a roadmap for continuous improvement and to revisit the self-assessment process regularly to track progress over time.`,
        size: 22, font: 'Arial',
      })],
    }),
    new Paragraph({
      spacing: { after: 200 },
      children: [new TextRun({
        text: `We appreciate ${schoolName}\u2019s commitment to improving cybersecurity practices and look forward to supporting their continued progress.`,
        size: 22, font: 'Arial',
      })],
    }),
    new Paragraph({
      spacing: { before: 400, after: 100 },
      children: [
        new TextRun({ text: auditorName, bold: true, size: 22, font: 'Arial' }),
      ],
    }),
    new Paragraph({
      children: [new TextRun({ text: 'Cybersecurity Assessment Practitioner', italics: true, size: 20, font: 'Arial', color: '666666' })],
    }),
    new Paragraph({
      children: [new TextRun({ text: 'CyberReady', size: 20, font: 'Arial', color: '666666' })],
    }),
  );

  // ── Build document ───────────────────────────────────────────
  const doc = new Document({
    styles: {
      default: { document: { run: { font: 'Arial', size: 22 } } },
    },
    numbering: {
      config: [{
        reference: 'bullets',
        levels: [{
          level: 0, format: LevelFormat.BULLET, text: '\u2022', alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 720, hanging: 360 } } },
        }],
      }],
    },
    sections: [{
      properties: {
        page: {
          size: { width: 12240, height: 15840 },
          margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 },
        },
      },
      headers: {
        default: new Header({
          children: [new Paragraph({
            alignment: AlignmentType.RIGHT,
            children: [new TextRun({ text: `${schoolName} \u2014 CCRE Report ${yearStr}`, size: 16, font: 'Arial', color: '999999' })],
          })],
        }),
      },
      footers: {
        default: new Footer({
          children: [new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({ text: 'Page ', size: 16, font: 'Arial', color: '999999' }),
              new TextRun({ children: [PageNumber.CURRENT], size: 16, font: 'Arial', color: '999999' }),
              new TextRun({ text: ' \u2014 Prepared by HallMonitor \u2022 CyberReady', size: 16, font: 'Arial', color: '999999' }),
            ],
          })],
        }),
      },
      children,
    }],
  });

  return Packer.toBuffer(doc);
}

module.exports = { generateCCREReport };

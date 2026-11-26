/**
 * Google Sheet that receives every form submission from the website.
 *
 * Setup (once):
 *  1. Create a Google Sheet (e.g. "Conexa – Formularios").
 *  2. Extensions → Apps Script. Replace the code with this file and save.
 *  3. Project Settings (gear) → Script properties → add SECRET = a long random text.
 *  4. Deploy → New deployment → type "Web app":
 *       Execute as: Me · Who has access: Anyone → Deploy, authorize, copy the URL.
 *  5. In Vercel add SHEETS_WEBHOOK_URL (that URL) and SHEETS_WEBHOOK_SECRET (same text
 *     as step 3), then redeploy the site.
 *
 * Each form gets its own tab ("Marcas", "Creadores"), created on first use.
 * New fields become new columns automatically; existing columns are never reordered.
 * If you edit this script later: Deploy → Manage deployments → edit → Version "New version"
 * (keeps the same URL).
 */
function doPost(e) {
  try {
    var body = JSON.parse(e.postData.contents);
    var secret = PropertiesService.getScriptProperties().getProperty("SECRET");
    if (!secret || body.secret !== secret) return reply({ ok: false, error: "unauthorized" });

    var name = body.sheet === "Creadores" ? "Creadores" : "Marcas";
    var row = body.row || {};
    var lock = LockService.getScriptLock();
    lock.waitLock(10000);
    try {
      var ss = SpreadsheetApp.getActiveSpreadsheet();
      var sheet = ss.getSheetByName(name) || ss.insertSheet(name);
      var headers =
        sheet.getLastColumn() > 0
          ? sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0]
          : [];
      Object.keys(row).forEach(function (k) {
        if (headers.indexOf(k) === -1) headers.push(k);
      });
      sheet.getRange(1, 1, 1, headers.length).setValues([headers]).setFontWeight("bold");
      sheet.setFrozenRows(1);
      // Prefix "'" so values like "+54 9 11…" or "=…" are stored as plain text.
      var values = headers.map(function (h) {
        var v = row[h] == null ? "" : String(row[h]);
        return v ? "'" + v : "";
      });
      sheet.appendRow(values);
    } finally {
      lock.releaseLock();
    }
    return reply({ ok: true });
  } catch (err) {
    return reply({ ok: false, error: String(err) });
  }
}

function reply(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON,
  );
}

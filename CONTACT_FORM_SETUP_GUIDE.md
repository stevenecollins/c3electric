# Contact Form Setup Guide

## What's Been Implemented

### ✅ Completed Changes:
1. **"Email Us" → "Contact Us"** - Changed to button that opens modal popup
2. **Contact Form Modal** - Professional popup form with:
   - Name field
   - Phone number field (auto-formats as you type)
   - Email field
   - Message textarea
   - Form validation
   - Success/error messages
3. **Email moved to footer** - Added email link at end of copyright text
4. **Google Sheets Integration** - Ready to connect (needs setup below)

---

## Google Sheets Setup (15 minutes)

### Step 1: Create Google Sheet

1. Go to [sheets.google.com](https://sheets.google.com)
2. Click **+ Blank** to create a new spreadsheet
3. Name it: **"C3 Contact Forms"**
4. In Row 1, add these column headers:
   ```
   A1: Timestamp
   B1: Name
   C1: Phone
   D1: Email
   E1: Message
   ```

### Step 2: Create Google Apps Script

1. In your Google Sheet, click **Extensions** → **Apps Script**
2. Delete any default code
3. **Copy and paste** this entire script:

```javascript
function doPost(e) {
  try {
    // Get the active spreadsheet
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

    // Parse the incoming data
    var data = JSON.parse(e.postData.contents);

    // Format timestamp to readable format
    var timestamp = new Date(data.timestamp);
    var formattedTime = Utilities.formatDate(timestamp, Session.getScriptTimeZone(), "MM/dd/yyyy HH:mm:ss");

    // Append data to sheet
    sheet.appendRow([
      formattedTime,
      data.name,
      data.phone,
      data.email,
      data.message
    ]);

    // OPTIONAL: Send email notification
    sendEmailNotification(data);

    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'success' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'error', 'error': error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// OPTIONAL: Email notification function
function sendEmailNotification(data) {
  // ⚠️ CHANGE THIS EMAIL to your sales manager's email
  var emailTo = "C3ElectricalContracting@gmail.com";

  var subject = "New Contact Form Submission - C3 Electrical";

  var message = "You have a new contact form submission:\n\n" +
                "Name: " + data.name + "\n" +
                "Phone: " + data.phone + "\n" +
                "Email: " + data.email + "\n" +
                "Message:\n" + data.message + "\n\n" +
                "---\n" +
                "Submitted: " + new Date(data.timestamp).toLocaleString();

  // Send email
  try {
    MailApp.sendEmail(emailTo, subject, message);
  } catch (error) {
    console.error("Error sending email:", error);
  }
}
```

4. **IMPORTANT:** In the script above, change line 36:
   ```javascript
   var emailTo = "C3ElectricalContracting@gmail.com";
   ```
   Replace with your **sales manager's email** address.

5. Click **Save** (disk icon) - name it "Contact Form Handler"

### Step 3: Deploy the Script

1. Click **Deploy** button (top right) → **New deployment**
2. Click the gear icon ⚙️ next to "Select type"
3. Choose **Web app**
4. Configure settings:
   - **Description:** "C3 Contact Form"
   - **Execute as:** "Me"
   - **Who has access:** "Anyone"
5. Click **Deploy**
6. **Authorize access:**
   - Click "Authorize access"
   - Choose your Google account
   - Click "Advanced" → "Go to Contact Form Handler (unsafe)"
   - Click "Allow"
7. **COPY THE WEB APP URL** - it looks like:
   ```
   https://script.google.com/macros/s/ABC123xyz.../exec
   ```

   📋 **Save this URL - you'll need it in Step 4!**

8. Click **Done**

### Step 4: Connect to Your Website

1. Open `script.js` in your website files
2. Find line 350 (search for `YOUR_GOOGLE_APPS_SCRIPT_URL_HERE`)
3. Replace it with your copied URL:
   ```javascript
   const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/YOUR_ACTUAL_URL/exec';
   ```
4. Save the file
5. Upload `script.js` to your web server

---

## Testing the Form

1. Open your website
2. Click the "Contact Us" button
3. Fill out the form with test data
4. Click "Send Message"
5. Check your Google Sheet - the data should appear!
6. Check email inbox for notification

---

## Changing the Notification Email Later

**It's super easy to change who receives form notifications:**

1. Open your Google Sheet
2. Click **Extensions** → **Apps Script**
3. Find line 36:
   ```javascript
   var emailTo = "current@email.com";
   ```
4. Change to new email address
5. Click **Save**
6. Done! No need to redeploy or touch the website

---

## Accessing Form Submissions

### Option 1: Google Sheets (Recommended)
- Go to your "C3 Contact Forms" Google Sheet
- All submissions are permanently saved here
- You can sort, filter, search, and export to Excel

### Option 2: Email Notifications
- Every form submission sends an email
- Check your sales manager's inbox
- Create a Gmail filter/label for organization

### Option 3: Share Access
To give someone else access to the submissions:
1. Open the Google Sheet
2. Click **Share** button (top right)
3. Add their email address
4. Choose permission level (Viewer or Editor)
5. Click **Send**

---

## Troubleshooting

### Form shows error: "Google Apps Script URL not configured"
- You haven't replaced `YOUR_GOOGLE_APPS_SCRIPT_URL_HERE` in script.js yet
- Follow Step 4 above

### Form submits but nothing appears in sheet
- Make sure you deployed as "Anyone" can access
- Check that the Web App URL in script.js is correct (includes `/exec` at the end)
- Try redeploying the script (Deploy → Manage deployments → Edit → Deploy)

### Not receiving email notifications
- Check spam/junk folder
- Verify the email address in line 36 of the Apps Script is correct
- Make sure you saved the script after changing the email

### Need to test without affecting live data
- Create a second Google Sheet for testing
- Deploy a second Apps Script with test sheet ID
- Use test URL on a development copy of your website

---

## Features Included

✅ **Modal popup** - Clean, professional form overlay
✅ **Form validation** - Checks all fields, email format, phone format
✅ **Auto-formatting** - Phone number formats as (XXX) XXX-XXXX
✅ **Success/error messages** - Clear feedback to users
✅ **Spam protection** - Basic validation prevents empty submissions
✅ **Mobile responsive** - Works perfectly on iPhone/tablet
✅ **Keyboard support** - Press Escape to close modal
✅ **Email notifications** - Instant alerts to sales manager
✅ **Permanent storage** - All submissions saved forever in Google Sheets
✅ **Unlimited submissions** - No monthly limits
✅ **Export capability** - Download as CSV/Excel anytime
✅ **Easy management** - Change notification email without touching website code

---

## Future Enhancements (Optional)

If you want to add more features later:
- Add reCAPTCHA spam protection
- Customize email template with HTML
- Add auto-reply email to customer
- Add more form fields (address, service type, etc.)
- Set up Slack/SMS notifications
- Create dashboard for submission analytics

---

## Support

If you need help with setup:
1. Check the troubleshooting section above
2. Review Google Apps Script documentation
3. Contact your web developer

---

**🎉 Once set up, your contact form will work automatically with zero ongoing maintenance!**

n8n ETL Pipeline for Student Data

## 📌 Problem Statement
Real-world student data is messy: extra spaces, inconsistent capitalisation,
invalid emails, and duplicate entries. This project builds an **n8n** workflow
that **Extracts** a messy CSV uploaded through an n8n form, **Transforms** and
filters it, and **Loads** a clean CSV into Google Drive.

## 🔄 Workflow
```
On Form Submission → Extract from File → Code (JavaScript)
→ Remove Duplicates → Filter → Convert to File → Google Drive (Upload)
```

| Stage | Node | What it does |
|---|---|---|
| Trigger / Extract | On Form Submission | User uploads `student_enrollment_raw.csv` through the n8n form |
| Extract | Extract from File | Converts CSV rows into n8n items (Header Row on) |
| Transform | Code in JavaScript | Trims spaces, fixes capitalisation, standardises course names, validates emails |
| Transform | Remove Duplicates | Removes rows with the same email |
| Filter | Filter | Keeps `Fee_Paid = yes` **AND** `Email_Valid = true` |
| Load | Convert to File | Converts the items back into a CSV |
| Load | Google Drive – Upload | Saves `student_enrollment_clean.csv` to Google Drive |

## 🧹 Data Problems Fixed
- Extra leading/trailing spaces → trimmed
- `manoj k`, `PRIYA S` → `Manoj K`, `Priya S` (Title Case)
- `yes / YES / Yes / No / NO` → `yes / no`
- `ml`, `ML`, `machine learning` → `Machine Learning`
- `chennai`, `CHENNAI` → `Chennai`
- Uppercase emails → lowercase
- Invalid emails (`manojk@gmail`, `ravikumar@`) → flagged as `Email_Valid = false`

## 📏 Rules (decided before building)
- **Duplicate:** two rows with the same email (after trimming and lowercasing)
- **Filter rule:** keep only students who **paid the fee** and have a **valid email**
- **Missing or invalid email:** dropped, because the student can't be contacted

## 📊 Rows In vs Rows Out
```
student_enrollment_raw.csv     50 rows in
  → trimmed, capitalisation fixed, emails lowercased
  → 0 duplicates removed
  → 17 rows filtered out (Fee_Paid = no)
  → 14 rows filtered out (invalid email)
student_enrollment_clean.csv   19 rows out
```

## 🐞 Issues Faced & Fixes
| Issue | Cause | Fix |
|---|---|---|
| Filter discarded all 50 rows | Compared `Fee_Paid` to `"Yes"`, but the data had `"yes"` | Lowercased in the Code node and turned on **Ignore Case** |
| `Error 401: invalid_client` | Wrong or incomplete Client ID pasted | Re-copied the Client ID from Google Cloud |
| `Error 403: access_denied` | OAuth app in Testing mode | Added my Gmail as a **Test user** |

## ▶️ How to Run
1. In n8n → **Import from File** → `n8n_student_etl_workflow.json`
2. Create a Google Drive OAuth2 credential (Google Cloud Client ID/Secret, Drive API enabled)
3. Select the target folder in the **Google Drive – Upload** node
4. Click **Execute workflow** → open the **form URL**
5. Upload `student_enrollment_raw.csv` and submit
6. Every node should turn green → open `student_enrollment_clean.csv` in Google Drive

## 📸 Screenshots
### Form Submission
![Fo
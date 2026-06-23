---
name: wedding-report-generator
description: Generates a beautiful client-facing PDF release notes report from version updates, Git history, and Playwright screenshots.
---

# Wedding Report Generator Skill (Invitation Client)

Use this skill to automatically generate a professional, client-facing PDF release notes report whenever there is a version update or significant changes to the digital wedding invitation client.

## Workflow Steps

### Step 1: Detect Version Updates
1. Check `package.json` in this repository.
2. Compare the version with the last stable git tag or commit. If a version bump is found, identify the target version (e.g., `v1.2.0`).
3. **Separate App Reports Policy (CRITICAL)**: If multiple applications or repositories in the wedding ecosystem are updated simultaneously, generate **separate** PDF reports for each application rather than merging them into a single PDF. Create separate JSON files and compile them individually.

### Step 2: Extract and Analyze Git History
1. Run `git log` since the last tag or previous version release to see the list of commits.
2. Group the changes into five standard categories:
   - **Peningkatan Kualitas & Performa (Improvements)**
   - **Perbaikan Kendala Sistem (Bugfixes)**
   - **Fitur Baru (New Features)**
   - **Penyesuaian Tata Letak & Alur (Changes)**
   - **Catatan Teknis & Ketentuan (Notes)**
3. **Tone of Voice Rules (CRITICAL)**:
   - Rephrase technical commit messages into clean, non-technical Bahasa Indonesia.
   - Avoid developer jargon (e.g., replace "hydration warnings", "focus trap", "framer motion timing" with "keselarasan tampilan perangkat", "navigasi keyboard tersembunyi", "animasi transisi").
   - **Never** use subjective adjectives (e.g., do not use "lebih bagus", "lebih rapi", "lebih cepat"). Explain the change objectively (e.g., "Penyesuaian penulisan nama kedua mempelai susun atas-bawah pada halaman sampul").

### Step 3: Capture Screenshots
1. Scan the list of updates for items that impact the user interface (UI) or layouts.
2. Since there is no local E2E test runner in this repository, screenshots should be generated using the Playwright suite inside the main `wedding-ecosystem` monorepo.
3. Open `/home/mochrafi/wedding-ecosystem` and execute the screenshot E2E test:
   ```bash
   npx playwright test tests/e2e/screenshot-generator.spec.ts --project=chromium --workspace=packages/api
   ```
4. Verify that screenshots are saved in `/home/mochrafi/wedding-project/wedding-report-generate/assets/invitation/<version>/<filename>.png`.

### Step 4: Populate Data JSON
1. Update `/home/mochrafi/wedding-project/wedding-report-generate/data.json` with the drafted changes.

### Step 5: Compile Report
1. Execute the report generator script:
   ```bash
   python3 /home/mochrafi/wedding-project/wedding-report-generate/generate_report.py
   ```
2. Present the link of the newly created PDF file to the user.

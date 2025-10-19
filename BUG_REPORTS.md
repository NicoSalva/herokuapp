# Bug Reports - Stranger List App

## BUG #1: Image validation is not working

### What I found
The app says images must be 320x320px but it accepts any size image. I tried uploading different sizes and they all work.

### How to test this bug
1. Go to the Stranger List application
2. Try to upload an image that is NOT 320x320px (like 100x100 or 500x500)
3. The image gets uploaded successfully (it should be rejected)

### What should happen
- Only 320x320px images should be accepted
- Other sizes should be rejected with an error message

### What actually happens
- Any size image gets uploaded
- No validation is performed
- The app accepts images that don't meet the requirements

### Technical info
- Image input: `input[type="file"][id="inputImage"]`
- Required size: 320x320px
- Current behavior: Accepts any size

### Test files
- `src/features/create-item.feature`
- `src/step-definitions/create-item.steps.ts`

### How serious is this?
**Medium** - Users can upload wrong size images, but the app still works.

### Status
**Open** - I found this bug with my automated tests

---

## BUG #2: Description length validation is not working

### What I found
The app says descriptions should be maximum 300 characters but it allows longer descriptions. I tried entering 350 characters and it worked.

### How to test this bug
1. Go to the Stranger List application
2. Try to enter a description with more than 300 characters
3. The description gets accepted (it should be rejected or truncated)

### What should happen
- Only descriptions up to 300 characters should be accepted
- Longer descriptions should be rejected or truncated

### What actually happens
- Any length description gets accepted
- No validation is performed on description length
- The app accepts descriptions that exceed the limit

### Technical info
- Text field: `textarea[name="text"]`
- Placeholder: "Maximum allowed length: 300 characters"
- Current behavior: Accepts any length

### Test files
- `src/features/create-item.feature`
- `src/step-definitions/create-item.steps.ts`

### How serious is this?
**Medium** - Users can create very long descriptions, which might cause UI issues.

### Status
**Open** - I found this bug with my automated tests

---

*Found these bugs using WebdriverIO and Cucumber tests*

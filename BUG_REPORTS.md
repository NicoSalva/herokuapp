# Bug Reports - Stranger List App

## BUG 1: Image Size Validation Issue
**Expected:** Only 320x320px images should be accepted
**Actual:** 100x100px images are accepted and items are created successfully
**Steps to Reproduce:**
1. Navigate to the application
2. Enter any description text
3. Upload a 100x100px image file
4. Click Create Item button
5. Item is created successfully (should be rejected)
**Test Coverage:** `@bug-detection` tag in "reject images that are not 320x320px" scenario
**Status:** Test currently fails (will pass when fixed)

## BUG 2: Description Length Validation
**Expected:** Descriptions longer than 300 characters should be rejected or disable Create button
**Actual:** App doesn't consistently block long descriptions
**Steps to Reproduce:**
1. Navigate to the application
2. Enter a description with 350+ characters
3. Upload any valid image
4. Create button should be disabled (sometimes works, sometimes doesn't)
**Test Coverage:** `@bug-detection` tag in "reject descriptions longer than 300 characters" scenario
**Status:** Covered by test validation

## BUG 3: Aspect Ratio Validation
**Expected:** Only square 320x320px images should be accepted
**Actual:** Non-square images can pass validation
**Steps to Reproduce:**
1. Navigate to the application
2. Enter any description text
3. Upload a non-square image (e.g., 320x200px)
4. Click Create Item button
5. Item is created successfully (should be rejected)
**Test Coverage:** `@bug-detection` tag in "reject images with wrong aspect ratio" scenario
**Status:** Covered by test validation
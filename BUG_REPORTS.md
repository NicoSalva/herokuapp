# Bug Reports - Stranger List App

## BUG #1: Create Item button is not working

### What I found
The "Create Item" button doesn't create new items in the list. I tried to add a new item but nothing happens when I click the button.

### How to test this bug
1. Go to the Stranger List application
2. Write some text in the description field
3. Click the "Create Item" button
4. Check if a new item appears in the list (it doesn't)

### What should happen
- A new item should be added to the list
- The list should have one more item
- I should see my new item in the list

### What actually happens
- Nothing happens when I click the button
- No new item is created
- The list stays the same

### Technical info
- Button: `button[ng-click*="createItem"]`
- Button text: "Create Item"
- Form: `strangerlist.detailsForm`
- Text field: `textarea[name="text"]`
- Image needs to be 320x320px

### Test files
- `src/features/create-item.feature`
- `src/step-definitions/create-item.steps.ts`

### How serious is this?
**Very serious** - Users can't add new items to the list. This is the main function of the app.

### Status
**Open** - I found this bug with my automated tests

---

*Found this bug using WebdriverIO and Cucumber tests*

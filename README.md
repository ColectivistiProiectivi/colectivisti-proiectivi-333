## Instructions (1st time cloning)

### Requirements: `node`, `npm`, `yarn`, `prettier`.

- https://nodejs.org/en/
- https://classic.yarnpkg.com/en/docs/install#windows-stable
- Prettier plug-in for IDEs:
  - Intellij: https://www.jetbrains.com/help/idea/prettier.html
  - VSCode: https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode
  - Also: Check for 'Format on save with prettier' setting
    
### Once you have the repository cloned:

1. Open a terminal in the repository root directory
2. Verify remote origin is set: `git remote -v` should display:
```
  origin  https://github.com/ColectivistiProiectivi/colectivisti-proiectivi-333.git (fetch)
  origin  https://github.com/ColectivistiProiectivi/colectivisti-proiectivi-333.git (push)
```

3. Switch to the correct branch: `git checkout frontend`
4. Get all the updates from remote branch: `git pull origin frontend`
5. Install packages locally: `yarn`
6. Run the FE app: `yarn run dev`

## Code Guidelines

###### Usual React component layout (ExampleComponent)

```typescript jsx
import React from 'react'
// ... imports ...

// Define what type does have the properties of ExampleComponent 
interface ExampleComponentProps {
  title: string,
  content: string,
  date: SomeCustomDateTypeOrSomething
}

export const ExampleComponent: React.FC<ExampleComponentProps> = ({ title, content, date }) => {
  // anything related to redux should be on the top
  const someValueFromReduxState = useAppSelector(someValueSelector)
  const dispatch = useAppDispatch()
  
  // anything related to basic react hooks should be second (newline between each 'level')
  const [showContent, setShowContent] = useState(true)
  
  // any methods should be third
  const renderSection = () => {
    return (
      <div>Example of Cool Section</div>
    )
  }
  
  // any constant should be fourth
  const someCustomStylingProperty = "red"
  
  // finally the 'main' return of the component
  return (
    <div>
      {showContent && (
        <>
          <h1>{title}</h1>
          <span>{content}</span>
        </>
      )}

      {renderSection()}
      
      <button
        style={{ color: someCustomStylingProperty }}
        onClick={() => dispatch(actionImportedFromASlice())}
      >
        {someValueFromReduxState}
      </button>
    </div>
  )
}
```

###### Usual Redux Slice
[Link To Slice Example](/fe/src/features/exampleFeature/slice.ts)

## Basic Git stuff

### All commands you need to know:
- `git add -A`
- `git commit -m "feat(<jira-code>): description"`
- `git push -u origin <branch_name>`

### Branch naming:
- `feature/<jira-code>-some-title`
- `refactor/<jira-code>-some-title`
- `fix/<jira-code>-some-title`

### Commit naming:
- `feature(<jira-code>): commit message`
- same for refactor and fix

Work in Progress...

### Also check:
- https://react-redux.js.org/
- https://redux-toolkit.js.org/tutorials/typescript
- https://www.typescriptlang.org/docs/handbook/intro.html
- https://mui.com/material-ui/getting-started/learn/ (Note: We should talk about using Material UI or not)

Don't forget, if you have any issues, blame @Andy
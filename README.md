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
=======
### Backend App Requirements and Setup:
JAVA VERSION: 17<br/>
MYSQL VERSION: mysql-installer-community-8.0.31.0 (https://dev.mysql.com/downloads/file/?id=514518)

<strong>MAKE SURE TO UNINSTALL ANY PREVIOUS MYSQL SERVER VERSION AND ANY RELATED APPLICATIONS!</strong>

Setup Type-> Custom -> Choose the Server, the MYSQL Workbench and the connector/j so in the products to be installed you should see 3 entries:
- MYSQL Server 8.0.31
- MySQL Workbench 8.0.31
- Connector/J 8.0.31

Go Next, hit execute and wait for everything to be installed. <br/>
Go next and the server configuration will begin. <br/>
On the Type and Networking page leave everything as it is by default and hit next.<br/>
On the Authentication Method page default and hit next.<br/>
On the accounts and roles we need to choose a password for the root user. Let's use "root" and hit next.<br/>
On the Windows Service page leave everything as it is and hit next.<br/>
Next page leave everything as default and hit next.<br/>
On the last page hit execute and wait for everything to finish.<br/>
After everything finished hit "Finish".

Start mysql workbench after we finished the setup.
Login to the root user using the "root" password we just set and tick "save in the vault" to have our password remembered.
The workbench page will appear and let's select from the MANAGEMENT PANEL the "Schemas" tab and let's create another schema(database).
Click the fourth icon from the left under the Menu(File, Edit, View, etc.)
For the name of the schema use "mp" hit apply and apply again in the window that appeared. Congratulations you have created a new database.

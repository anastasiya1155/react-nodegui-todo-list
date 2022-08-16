import { Text, Window, hot, View, LineEdit, Button } from "@nodegui/react-nodegui";
import React, { useMemo } from "react";
import { QIcon } from "@nodegui/nodegui";
import nodeguiIcon from "../assets/nodegui.jpg";

const minSize = { width: 500, height: 520 };
const winIcon = new QIcon(nodeguiIcon);
const App = () => {
  const [todos, setTodos] = React.useState<string[]>([]);
  const [value, setValue] = React.useState('');
  const lineEditHandler = useMemo(
    () => ({
      textChanged: (text: string) => {
        setValue(text);
      }
    }),
    []
  );
  const loadButtonHandler = useMemo(
    () => ({
      clicked: () => {
        if (value) {
          setTodos(prev => [...prev, value]);
          setValue('');
        }
      }
    }),
    [value]
  );
  const todoHandler = (todo: string) => ({
      clicked: () => {
          setTodos(prev => prev.filter(p => p !== todo));
      }
    })
    return (
      <Window
        windowIcon={winIcon}
        windowTitle="ToDo List"
        minSize={minSize}
        styleSheet={styleSheet}
      >
        <View style={containerStyle}>
          <Text id="welcome-text">ToDo List</Text>
          <LineEdit
            on={lineEditHandler}
            id="textField"
            text={value}
            placeholderText="What do you need to do"
            style="padding: 4px 8px;"
          />
          <Button text="Add" on={loadButtonHandler} id="btn" />
          {todos.map(t => <Button on={todoHandler(t)} text={t} style={todoStyle}/>)}
        </View>
      </Window>
    );
}

const containerStyle = `
  flex: 1; 
  padding: 15px;
`;

const todoStyle = `
  background: none;
  border: 1px solid gray;
  border-radius: 3px;
`;

const styleSheet = `
  #welcome-text {
    font-size: 24px;
    padding-top: 20px;
    qproperty-alignment: 'AlignHCenter';
    font-family: 'sans-serif';
  }
  
  #btn {
    margin-bottom: 10px;
    padding: 4px 8px;
  }
`;

export default hot(App);

import React from "react";
import { render } from "react-dom";
import Hello from "./Hello";

const styles = {
  fontFamily: "sans-serif",
  textAlign: "center"
};

class Workflow extends React.Component {
  constructor() {
    super();
    this.state = {
      workflows: [
        {
          name: "Dev",
          duration: 15,
          completed: false,
          id: 0
        }
      ]
    };

    this.id = 0;
  }

  addWorkflow() {
    let id = ++this.id;
    const text = prompt("What is your new workflow?");
    const duration = prompt("What is the duration?");
    this.setState({
      workflows: [
        ...this.state.workflows,
        { name: text, duration: duration, completed: false, id: id }
      ]
    });
  }

  removeWorkflow(id) {
    this.setState({
      workflows: this.state.workflows.filter(workflow => workflow.id !== id)
    });
  }

  toogleTodo(id) {
    this.setState({
      workflows: this.state.workflows.map(workflow => {
        if (workflow.id !== id) return workflow;
        else
          return {
            id: id,
            name: workflow.name,
            duration: workflow.duration,
            completed: !workflow.completed
          };
      })
    });
  }

  toogleAll() {
    const workflows = this.state.workflows;
    console.log(workflows);
    if (this.allDone()) {
      for (let i in workflows) workflows[i].completed = false;
    } else {
      for (let i in workflows) workflows[i].completed = true;
    }
    this.setState({ workflows: workflows });
  }

  allDone() {
    for (let i = 0; i < this.state.workflows.length; i++)
      if (!this.state.workflows[i].completed) return false;
    return true;
  }

  update() {
    const index = prompt("update position: ") - 1;
    const text = prompt("text");

    const workflows = this.state.workflows;
    workflows[index].name = text;
    this.setState({ workflows: workflows });
  }

  render() {
    return (
      <div>
        <ol>
          {this.state.workflows.map(workflow => (
            <li>
              {workflow.completed ? (
                <strike>
                  {" "}
                  {workflow.name} {workflow.duration}{" "}
                </strike>
              ) : (
                <nostrike>
                  {workflow.name} {workflow.duration}{" "}
                </nostrike>
              )}
              <button onClick={() => this.toogleTodo(workflow.id)}>
                toogle
              </button>{" "}
              <button onClick={() => this.removeWorkflow(workflow.id)}>
                delete
              </button>
            </li>
          ))}
        </ol>
        <button onClick={() => this.addWorkflow()}>Add</button>
        <button onClick={() => this.toogleAll()}>Toogle All</button>
        <button onClick={() => this.update()}>Update</button>
      </div>
    );
  }
}

const App = () => <Workflow />;

render(<App />, document.getElementById("root"));

import { useEffect } from "react";

const TodoContainer = ({ todos }) => {
	const toddleTodoState = () => {};
	useEffect(() => {
		console.log(todos);
	}, [todos]);
	return (
		<div>
			{todos?.map((todo) => {
				return (
					<div className="flex" key={todo.id}>
						<div>
							<input
								type="checkbox"
								value={todo.checked}
								onChange={toddleTodoState}
							/>
							<p>{todo.task}</p>
						</div>
						<div>
							<button>Edit</button>
							<button>Delete</button>
						</div>
					</div>
				);
			})}
		</div>
	);
};

export default TodoContainer;

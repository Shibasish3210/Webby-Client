import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "../reduxToolkit/slices/user/userSlice";
import Input from "../components/shared/Input";
import Navbar from "../components/structured/Navbar";
import Button from "../components/shared/Button";

const Login = () => {
	const loginId = useRef("");
	const password = useRef("");

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const handleLogin = async (e) => {
		e.preventDefault();
		dispatch(
			loginUser({
				loginId: loginId.current.value,
				password: password.current.value,
				navigate,
			}),
		);
	};
	return (
		<>
			<Navbar />
			<form onSubmit={handleLogin}>
				<div className="inputFields">
					<Input
						id="loginId"
						label="User Name/ Email :"
						placeholder={"Enter your user name or email"}
						refrence={loginId}
					/>
					<Input
						id="password"
						type={"password"}
						label="Your Password :"
						placeholder={"Enter your Password"}
						refrence={password}
					/>
				</div>

				<div className="mt-20 w-full text-center">
					<Button type="submit" value={"Log In"} />
					<p className="mt-4">
						{`Don't Have An Account?`}{" "}
						<Link className="pl-3" to={"/register"}>
							Click Here!
						</Link>{" "}
					</p>
				</div>
			</form>
		</>
	);
};

export default Login;

import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "../reduxToolkit/slices/user/userSlice";
import Input from "../components/shared/Input";
import Navbar from "../components/structured/Navbar";
import Button from "../components/shared/Button";
import ModalMaker from "../components/shared/ModalMaker";

const Login = () => {
	const loginId = useRef("");
	const password = useRef("");

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const handleLogin = async () => {
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
			<div className="styled_form">
				<div className="modal-content styled-modal-form-content">
					<ModalMaker isModal={false} modalTitle={"Log In Form"}>
						{{
							modalInputs: (
								<>
									<Input
										id="loginId"
										label="User Name/ Email"
										placeholder={
											"Enter your user name or email"
										}
										reference={loginId}
									/>
									<Input
										id="password"
										type={"password"}
										label="Your Password"
										placeholder={"Enter your Password"}
										reference={password}
									/>
								</>
							),
							modalButtons: (
								<Button
									type="button"
									func={handleLogin}
									value={"Log In"}
								/>
							),
							modalFooter: (
								<p className="mt-4">
									{`Don't Have An Account?`}{" "}
									<Link
										className="pl-3 underline underline-offset-4"
										to={"/register"}
									>
										Click Here!
									</Link>{" "}
								</p>
							),
						}}
					</ModalMaker>
				</div>
			</div>
		</>
	);
};

export default Login;

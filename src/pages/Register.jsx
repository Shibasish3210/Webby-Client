import { memo, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/structured/Navbar";
import Input from "../components/shared/Input";
import Button from "../components/shared/Button";
import {
	registerUser,
	updateUser,
} from "../reduxToolkit/slices/user/userSlice";
import { useDispatch } from "react-redux";
import ModalMaker from "../components/shared/ModalMaker";
import FileInput from "../components/shared/FileInput";

const Register = () => {
	const name = useRef(null);
	const userName = useRef(null);
	const email = useRef(null);
	const password = useRef(null);
	const confPass = useRef(null);
	const image = useRef("");

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const handleRegistration = async () => {
		// dispatch(
		// 	registerUser({
		// 		name,
		// 		userName,
		// 		email,
		// 		password,
		// 		navigate,
		// 	}),
		// );
		const dispatchPayload = {
			name: name.current.value,
			userName: userName.current.value,
			email: email.current.value,
			password: password.current.value,
			newPassword: confPass.current.value,
			image: image.current,
			navigate,
		};
		console.log(dispatchPayload);
		dispatch(
			updateUser(dispatchPayload),
		);
	};
	return (
		<>
			<Navbar />
			<div className="styled_form overflow-y-scroll">
				<div className="modal-content h-[85vh] overflow-y-scroll styled-modal-form-content">
					<ModalMaker
						isModal={false}
						modalTitle={"Registration Form"}
					>
						{{
							modalInputs: (
								<>
									<Input
										id="name"
										label="Your Name"
										placeholder={"Elon Musk"}
										reference={name}
									/>
									<Input
										id="userName"
										label="Your User Name"
										placeholder={"Elon_The_Doge_God"}
										reference={userName}
									/>
									<Input
										id="email"
										label="Your Email"
										placeholder={"elon@tesla.com"}
										reference={email}
									/>
									<Input
										id="password"
										type={"password"}
										label="Your Password"
										placeholder={"abcd123!@#"}
										reference={password}
									/>
									<Input
										id="cpassword"
										type={"password"}
										label="Confirm Your Password"
										placeholder={"abcd123!@#"}
										reference={confPass}
									/>
									<FileInput imageValueRef={image} />
								</>
							),
							modalButtons: (
								<Button
									type={"button"}
									func={handleRegistration}
									value={"Register"}
								/>
							),
							modalFooter: (
								<p>
									{`Already Have An Account?`}
									<Link
										className="pl-1 underline underline-offset-4"
										to={"/login"}
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

export default Register;

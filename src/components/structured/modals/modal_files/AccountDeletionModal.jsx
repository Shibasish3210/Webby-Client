import { useRef } from "react";
import ModalMaker from "../../../shared/ModalMaker";
import Input from "../../../shared/Input";
import { toast } from "react-toastify";
import { deleteUser } from "../../../../reduxToolkit/slices";
import { closeModal } from "../../../../reduxToolkit/slices/modal/modalSlice";
import { useDispatch } from "react-redux";

const AccountDeletionModal = () => {
	const email = useRef();
	const password = useRef();
	const dispatch = useDispatch();

	const handleDeletion = async (e) => {
		e.preventDefault();
		if (!email.current.value || !password.current.value) {
			toast.error(`Please enter "Email" and "Password"`);
			return;
		}

		try {
			dispatch(
				deleteUser({
					email: email.current.value,
					password: password.current.value,
					navigate,
				}),
			);
			dispatch(closeModal());
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<ModalMaker
			modalTitle={"Delete Account"}
			modalDesc={"Please Fill Your Original Email & Password To Delete!"}
		>
			{{
				modalInputs: (
					<>
						<Input
							id="modal-del-email"
							label="Enter your email"
							placeholder="xyz@gmail.com"
							reference={email}
							required={true}
						/>
						<Input
							id="modal-del-password"
							label="Enter your password"
							placeholder="(a-z),(A-Z),(0-9),(!-&)"
							reference={password}
							required={true}
						/>
					</>
				),
				modalButtons: (
					<button
						type="button"
						className="Button mt-8"
						onClick={handleDeletion}
					>
						Confirm !
					</button>
				),
			}}
		</ModalMaker>
	);
};

export default AccountDeletionModal;

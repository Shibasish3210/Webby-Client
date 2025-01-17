import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { removeUser } from "../../reduxToolkit/slices/user/userSlice";
import Button from "../shared/Button";
import { USER_TOKEN } from "../../helpers/apiEndpoints";
import { openModal } from "../../reduxToolkit/slices/modal/modalSlice";

const Sidebar = ({ isSidebarOpen }) => {
	const [errorWithImage, setErrorWithImage] = useState(false);
	const user = useSelector((state) => state.userReducer.user);

	const navigate = useNavigate();
	const dispatch = useDispatch();
	const handleLogOut = () => {
		document.cookie =
			USER_TOKEN + "=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
		dispatch(removeUser());
		navigate("/login");
	};

	const openAccountDeletionModal = () => {
		dispatch(
			openModal({
				modalType: "ACCOUNT_DELETE",
				modalProps: {},
			}),
		);
	};

	return (
		<div
			className={`fixed right-0 h-screen top-0 bg-[#092737] flex flex-col p-8 gap-4 items-center z-10 ${
				isSidebarOpen ? "animate-slide_in" : "animate-slide_out"
			}`}
		>
			{errorWithImage ? (
				<div className="h-32 w-32 mt-12 rounded-full bg-slate-400 grid place-items-center">
					<span className="text-4xl font-extrabold bg-blend-multiply text-[#092737]">
						{user.userName.charAt(0).toUpperCase()}
					</span>
				</div>
			) : (
				<img
					onError={() => setErrorWithImage(true)}
					className="h-32 w-32 mt-12 rounded-full object-cover "
					src={user?.avatar}
					alt="Hello"
				/>
			)}
			<div className="mt-auto flex flex-col items-center gap-8">
				<Button
					wide={true}
					func={() => navigate("/dashboard")}
					value={"Dashboard"}
				/>
				<Button
					wide={true}
					func={() => navigate("/explore")}
					value={"Explore"}
				/>
				<Button wide={true} func={handleLogOut} value={"Log Out"} />
				<Button
					wide={true}
					func={() => openAccountDeletionModal()}
					value={"Delete Account"}
				/>
			</div>
		</div>
	);
};

export default Sidebar;

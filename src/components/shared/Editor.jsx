import { useEffect, useState } from "react";
import Codemirror from "@uiw/react-codemirror";
import { dracula } from "@uiw/codemirror-theme-dracula";
import { javascript } from "@codemirror/lang-javascript";
import { xml } from "@codemirror/lang-xml";
import { css } from "@codemirror/lang-css";
import JavaScript from "../../assets/javaScript.svg";
import Html from "../../assets/html.svg";
import Css from "../../assets/css.svg";
import { FaExpand, FaCopy } from "react-icons/fa";
import { IoMdClose, IoMdDoneAll } from "react-icons/io";
import { EditorLanguages } from "../../helpers/editorHelper";
import { toast } from "react-toastify";

const jsExtensions = [javascript({ jsx: true })];
const xmlExtensions = [xml()];
const cssExtensions = [css()];

const Editor = (props) => {
	const {
		value,
		language,
		onchange,
		width,
		isExpanded,
		openModal,
		closeModal,
		height,
	} = props;
	const [lang, setLang] = useState();
	const [img, setImg] = useState();
	const [copyToClipboardStarted, setCopyToClipboardStarted] = useState(false);

	useEffect(() => {
		if (language === EditorLanguages.HTML) {
			setLang(xmlExtensions);
			setImg(Html);
		} else if (language === EditorLanguages.CSS) {
			setLang(cssExtensions);
			setImg(Css);
		} else {
			setLang(jsExtensions);
			setImg(JavaScript);
		}
	}, [language]);

	const handleCopyToClipboard = async () => {
		try {
			await navigator.clipboard.writeText(value);
			setCopyToClipboardStarted(true);
			toast.success("Code copied successfully");
		} catch (error) {
			toast.error(
				`${error.message || "Something went wrong while copying"}`,
			);
			console.log(error);
		}
		setTimeout(() => {
			setCopyToClipboardStarted(false);
		}, 3000);
	};

	return (
		<div
			className={`mb-1 ${
				height ? `h-[70vh]` : "h-[29.25vh]"
			} border-[1px] rounded-md`}
		>
			<div className="flex justify-between items-center border-b-[1px] px-4 py-1">
				<div className="flex items-center gap-1 h-[10%] pb-1">
					<span>
						<img src={img} alt="logo" />
					</span>
					<h3 className="text-sm">{language}</h3>
				</div>
				<div className="btn-cont btn-cont flex items-center gap-2">
					{!copyToClipboardStarted ? (
						<button onClick={handleCopyToClipboard}>
							<FaCopy />
						</button>
					) : (
						<button title="copied">
							<IoMdDoneAll />
						</button>
					)}
					{isExpanded ? (
						<button
							onClick={() => {
								closeModal(language);
							}}
						>
							<IoMdClose className="text-xl" />
						</button>
					) : (
						<button
							onClick={() => {
								console.log(language);
								openModal(language);
							}}
						>
							<FaExpand />
						</button>
					)}
				</div>
			</div>
			<Codemirror
				value={value}
				onChange={onchange}
				extensions={lang}
				theme={dracula}
				className="w-full"
				width={width}
			/>
		</div>
	);
};

export default Editor;

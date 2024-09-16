import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Editor from "../shared/Editor";
import { addCurrProject } from "../../reduxToolkit/slices/project/projectSlice";
import useEditorState from "../../hooks/useEditorState";
import { EditorLanguages } from "../../helpers/editorHelper";
import ModalEditor from "./ModalEditor";

const WorkSpace = ({ projectId, htmlText, cssText, jsText }) => {
	const [html, setHtml] = useState("");
	const [css, setCss] = useState("");
	const [js, setJs] = useState("");
	const [srcDoc, setsrcDoc] = useState("");

	const {
		isHTMLExpanded,
		isCssExpanded,
		isJsExpanded,
		openModal,
		closeModal,
	} = useEditorState();
	const projectData = useSelector(
		(state) => state.projectReducer.currProject,
	);

	const dispatch = useDispatch();
	useEffect(() => {
		htmlText && setHtml(htmlText);
		cssText && setCss(cssText);
		jsText && setJs(jsText);
	}, [htmlText, cssText, jsText]);

	useEffect(() => {
		let compile = setTimeout(() => {
			setsrcDoc(`
        <html>
            <body> 
            ${html}
            <style>${css}</style>
            <script>${js}</script>
            </body>
        </html>
        `);
			dispatch(
				addCurrProject({ ...projectData, projectId, html, css, js }),
			);
		}, 350);

		return () => clearTimeout(compile);
	}, [html, css, js, dispatch, projectId]);

	return (
		<div className="outer">
			<div className="code">
				<Editor
					language={EditorLanguages.HTML}
					onchange={setHtml}
					value={html}
					openModal={openModal}
					closeModal={closeModal}
					isExpanded={isHTMLExpanded}
				/>
				<Editor
					language={EditorLanguages.CSS}
					onchange={setCss}
					value={css}
					openModal={openModal}
					closeModal={closeModal}
					isExpanded={isCssExpanded}
				/>
				<Editor
					language={EditorLanguages.JAVASCRIPT}
					onchange={setJs}
					value={js}
					openModal={openModal}
					closeModal={closeModal}
					isExpanded={isJsExpanded}
				/>
				{isHTMLExpanded && (
					<ModalEditor
						value={html}
						language={EditorLanguages.HTML}
						onchange={setHtml}
						openModal={openModal}
						closeModal={closeModal}
						isExpanded={isHTMLExpanded}
					/>
				)}
				{isCssExpanded && (
					<ModalEditor
						value={css}
						language={EditorLanguages.CSS}
						onchange={setCss}
						openModal={openModal}
						closeModal={closeModal}
						isExpanded={isCssExpanded}
					/>
				)}
				{isJsExpanded && (
					<ModalEditor
						value={js}
						language={EditorLanguages.JAVASCRIPT}
						onchange={setJs}
						openModal={openModal}
						closeModal={closeModal}
						isExpanded={isJsExpanded}
					/>
				)}
			</div>
			<div className="output">
				<iframe
					title="browserScreen"
					sandbox="allow-scripts"
					srcDoc={srcDoc}
					height="97%"
					width="100%"
					loading="lazy"
					className="bg-slate-200"
				></iframe>
			</div>
		</div>
	);
};

export default WorkSpace;

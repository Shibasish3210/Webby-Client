import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Editor from '../components/Editor';
import { addCurrProject } from '../reduxToolkit/slices/projectSlice';

const WorkSpace = ({projectId, htmlText, cssText, jsText}) => {
    let [html, setHtml] = useState('');
    let [css, setCss] = useState('');
    let [js, setJs] = useState('');
    let [srcDoc, setsrcDoc] = useState('');

    const dispatch = useDispatch();
    useEffect(()=>{
      htmlText && setHtml(htmlText);
      cssText && setCss(cssText);
      jsText && setJs(jsText);
    },[htmlText, cssText, jsText]);

    
    useEffect(()=>{
      let compile = setTimeout(()=>{
        setsrcDoc(`
        <html>
            <body> 
            ${html}
            <style>${css}</style>
            <script>${js}</script>
            </body>
        </html>
        `)
        dispatch(addCurrProject({projectId,html,css, js}));
      },350);
  
      return ()=> clearTimeout(compile);
    },[html, css, js, dispatch, projectId]);
  
    return (
      <div className='outer'>
        <div className='code'>
          <Editor language={'HTML'} onchange={setHtml} value={html} />
          <Editor language={'CSS'} onchange={setCss} value={css} />
          <Editor language={'JS'} onchange={setJs} value={js} />
        </div>
        <div className='output'>
          <iframe sandbox='allow-scripts' srcDoc={srcDoc} height='100%' width='100%' loading='lazy' className='bg-slate-200'></iframe>
        </div>
      </div>
    )
}

export default WorkSpace

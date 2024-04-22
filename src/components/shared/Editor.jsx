import { useEffect, useState } from 'react';
import Codemirror from '@uiw/react-codemirror'
import { dracula } from "@uiw/codemirror-theme-dracula"
import { javascript } from '@codemirror/lang-javascript';
import { xml } from '@codemirror/lang-xml';
import { css } from '@codemirror/lang-css';
import JavaScript from '../../assets/javaScript.svg';
import Html from '../../assets/html.svg';
import Css from '../../assets/css.svg';

const jsExtensions = [ javascript( {jsx: true} ) ];
const xmlExtensions = [ xml() ];
const cssExtensions = [ css() ];

const Editor = (props) => {
  const [lang , setLang] = useState();
  const [img , setImg] = useState();
  const { value, language, onchange } = props;

  useEffect(()=>{
    if(language === 'HTML'){
      setLang(xmlExtensions);
      setImg(Html);
    }else if(language === 'CSS'){
      setLang(cssExtensions);
      setImg(Css);
    }else{
      setLang(jsExtensions);
      setImg(JavaScript);
    }
  },[language])
  
  return (
      <div className='mb-1 h-[30vh]'>
          <div className="flex justify-between">
            <div className='flex items-center gap-1 h-[10%] pb-1'>
              <span>
                <img src={img} alt="logo"/>
              </span>
              <h3 className='text-sm'>{language}</h3>
            </div>
            <div>
              {/* <button>O/C</button> */}
            </div>
          </div>
          <Codemirror value={value} onChange={onchange} extensions={ lang } theme={dracula} className='w-full'/>
      </div>
  )
}

export default Editor


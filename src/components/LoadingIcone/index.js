import {AiOutlineLoading3Quarters} from 'react-icons/ai'
import { IconContext } from "react-icons";

export default function LoadingIcone(){
    return(
        <div style={{marginTop: '150px', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <IconContext.Provider value={{color: '#96FFB3', className: "loading-icone", size: '80px' }}>
        <div>
            <AiOutlineLoading3Quarters />
        </div>
        </IconContext.Provider>
    </div>
    )
}
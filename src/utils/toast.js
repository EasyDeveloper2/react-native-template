import {Toast} from 'native-base';
import { sw } from './screenAdapter';


const show = ({text,type="success",duration=1500,position='top'})=>{
    Toast.show({
        text: text,
        buttonText: '',
        duration: duration,
        position: "top",
        type: type,
        style:{top: sw(44),backgroundColor:'#FD0035'}
    })
}

export default {
    show
}
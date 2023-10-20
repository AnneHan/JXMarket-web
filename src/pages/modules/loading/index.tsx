import * as React from 'react';
import Loading1 from '../../components/Loading/Loading1';
import Loading2 from '../../components/Loading/Loading2';
import Loading3 from '../../components/Loading/Loading3';
import Loading4 from '../../components/Loading/Loading4';
import Loading5 from '../../components/Loading/Loading5';
import Loading6 from '../../components/Loading/Loading6';
import Loading7 from '../../components/Loading/Loading7';
import Loading8 from '../../components/Loading/Loading8';
import Loading9 from '../../components/Loading/Loading9';
import Loading10 from '../../components/Loading/Loading10';
import Loading11 from '../../components/Loading/Loading11';
import Loading12 from '../../components/Loading/Loading12';

import './loading.scss'

export default class Loading extends React.PureComponent<any, any>{

    render() {
        return (
            <div className='loading_wrap row'>
                <Loading1 className='loading_item col-2' />
                <Loading2 className='loading_item col-2' />
                <Loading3 className='loading_item col-2' />
                <Loading4 className='loading_item col-2' />
                <Loading5 className='loading_item col-2' />
                <Loading6 className='loading_item col-2' />
                <Loading7 className='loading_item col-2' />
                <Loading8 className='loading_item col-2' />
                <Loading9 className='loading_item col-2' />
                <Loading10 className='loading_item col-2' />
                <Loading11 className='loading_item col-2' />
                <Loading12 className='loading_item col-2' />
            </div>)
    }
}

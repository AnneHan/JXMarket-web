import React from 'react'
import Loading5 from '../../components/Loading/Loading5';
import './loading.scss'

const Loading: React.FC = React.memo((): React.ReactElement => {
  return (
    <div className="global_loading">
      <Loading5 className="loading_item col-2" />
    </div>
  )
})

export default Loading
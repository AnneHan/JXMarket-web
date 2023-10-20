import React, { useContext } from 'react'
import { useLocalObservable } from 'mobx-react-lite'
import { IStoreTypes, createStore } from '../index'

export const StoreContext = React.createContext<IStoreTypes | null>(null)

export const Provider: React.FC = ({ children }: IObjectProps): React.ReactElement => {
  const store = useLocalObservable(createStore)
  return <StoreContext.Provider value={store}> {children} </StoreContext.Provider>
}

export const useStore = () => {
  const store = useContext(StoreContext)
  if (!store) {
    throw new Error('You have forgot to use StoreProvider.')
  }
  return store
}

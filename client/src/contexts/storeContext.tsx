import React from 'react'
import { createStore } from '../mobxStore/store'
import { useLocalStore } from 'mobx-react'

const StoreContext: React.Context<any> = React.createContext({})

export const StoreProvider = (props: { children: React.ReactNode}) => {
  const store = useLocalStore(createStore)

  return <StoreContext.Provider value={store}>
    {props.children}
  </StoreContext.Provider>
}

export const useStore = () => React.useContext(StoreContext)
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import Web3 from 'web3'
import { toast } from '@/hooks/use-toast'

interface Web3ContextType {
  web3: Web3 | null
  account: string | null
  balance: string | null
  chainId: number | null
  contract: any | null
  connect: () => Promise<void>
  disconnect: () => void
  isConnecting: boolean
  isConnected: boolean
}

const Web3Context = createContext<Web3ContextType | undefined>(undefined)

export const useWeb3 = () => {
  const context = useContext(Web3Context)
  if (!context) {
    throw new Error('useWeb3 must be used within Web3Provider')
  }
  return context
}

interface Web3ProviderProps {
  children: ReactNode
}

export const Web3Provider: React.FC<Web3ProviderProps> = ({ children }) => {
  const [web3, setWeb3] = useState<Web3 | null>(null)
  const [account, setAccount] = useState<string | null>(null)
  const [balance, setBalance] = useState<string | null>(null)
  const [chainId, setChainId] = useState<number | null>(null)
  const [contract, setContract] = useState<any | null>(null)
  const [isConnecting, setIsConnecting] = useState(false)
  const [isConnected, setIsConnected] = useState(false)

  const SEPOLIA_CHAIN_ID = 11155111

  useEffect(() => {
    checkConnection()
  }, [])

  const checkConnection = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        const web3Instance = new Web3(window.ethereum)
        setWeb3(web3Instance)

        const accounts = await web3Instance.eth.getAccounts()
        if (accounts.length > 0) {
          setAccount(accounts[0])
          setIsConnected(true)
          await updateBalance(web3Instance, accounts[0])
          await updateChainId(web3Instance)
        }
      } catch (error) {
        console.error('Error checking connection:', error)
      }
    }
  }

  const updateBalance = async (web3Instance: Web3, address: string) => {
    try {
      const balanceWei = await web3Instance.eth.getBalance(address)
      const balanceEth = web3Instance.utils.fromWei(balanceWei, 'ether')
      setBalance(parseFloat(balanceEth).toFixed(4))
    } catch (error) {
      console.error('Error updating balance:', error)
    }
  }

  const updateChainId = async (web3Instance: Web3) => {
    try {
      const id = await web3Instance.eth.getChainId()
      setChainId(Number(id))
    } catch (error) {
      console.error('Error getting chain ID:', error)
    }
  }

  const connect = async () => {
    if (typeof window.ethereum === 'undefined') {
      toast({
        title: 'MetaMask Not Found',
        description: 'Please install MetaMask to use this application',
        variant: 'destructive',
      })
      return
    }

    setIsConnecting(true)

    try {
      const web3Instance = new Web3(window.ethereum)
      setWeb3(web3Instance)

      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      })

      if (accounts.length > 0) {
        setAccount(accounts[0])
        setIsConnected(true)
        await updateBalance(web3Instance, accounts[0])
        await updateChainId(web3Instance)

        const currentChainId = await web3Instance.eth.getChainId()
        if (Number(currentChainId) !== SEPOLIA_CHAIN_ID) {
          toast({
            title: 'Wrong Network',
            description: 'Please switch to Sepolia testnet',
            variant: 'destructive',
          })
        } else {
          toast({
            title: 'Wallet Connected',
            description: `Connected to ${accounts[0].slice(0, 6)}...${accounts[0].slice(-4)}`,
          })
        }
      }
    } catch (error: any) {
      console.error('Error connecting wallet:', error)
      toast({
        title: 'Connection Failed',
        description: error.message || 'Failed to connect wallet',
        variant: 'destructive',
      })
    } finally {
      setIsConnecting(false)
    }
  }

  const disconnect = () => {
    setAccount(null)
    setBalance(null)
    setIsConnected(false)
    toast({
      title: 'Wallet Disconnected',
      description: 'Your wallet has been disconnected',
    })
  }

  useEffect(() => {
    if (typeof window.ethereum !== 'undefined') {
      window.ethereum.on('accountsChanged', (accounts: string[]) => {
        if (accounts.length > 0) {
          setAccount(accounts[0])
          if (web3) {
            updateBalance(web3, accounts[0])
          }
        } else {
          disconnect()
        }
      })

      window.ethereum.on('chainChanged', () => {
        window.location.reload()
      })
    }

    return () => {
      if (typeof window.ethereum !== 'undefined') {
        window.ethereum.removeAllListeners('accountsChanged')
        window.ethereum.removeAllListeners('chainChanged')
      }
    }
  }, [web3])

  const value: Web3ContextType = {
    web3,
    account,
    balance,
    chainId,
    contract,
    connect,
    disconnect,
    isConnecting,
    isConnected,
  }

  return <Web3Context.Provider value={value}>{children}</Web3Context.Provider>
}

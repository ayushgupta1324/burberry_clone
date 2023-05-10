import { useToast } from '@chakra-ui/react'
import React from 'react'
import { Navigate } from 'react-router-dom'


const PrivateRoute = ({children}) => {
    const token = localStorage.getItem("token")
    const toast = useToast()

    if(!token)
    {
        toast({
            title: 'Please Login to Access Cart',
            status: 'info',
            duration: 1500,
            isClosable: true,
            position:"top",
            variant:"left-accent"
        })
        return <Navigate to ="/login" replace={true}/>
    }
    else
    {
        return children
    }
  
}

export default PrivateRoute
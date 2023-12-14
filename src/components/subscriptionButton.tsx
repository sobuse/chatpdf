'use client'
import axios from 'axios'
import React from 'react'
import { Button } from './ui/button'

type Props = {isPro: boolean}

const subscriptionButton = (props: Props) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [loading, setLoading] =  React.useState(false)
    const handleSubscription = async () => {
        try {
            setLoading(true)
            const resonse = await axios.get('/api/stripe');
            window.location.href = resonse.data.url
        } catch (error) {
            console.error(error)
        } finally{
            setLoading(false)
        }
    }
  return (
    <Button disabled={loading} onClick={handleSubscription} variant="outline">
        {props.isPro ? "Manage Subscription": "Get Pro" }
    </Button>
  )
}

export default subscriptionButton
import React from 'react'

export async function generateMetadata({params}) {
    console.log(params)
    return {
	title: `${params.group} - Next Keep`
    }
}

const GroupLayout = () => {

  return (
    <div>GroupLayout</div>
  )
}

export default GroupLayout

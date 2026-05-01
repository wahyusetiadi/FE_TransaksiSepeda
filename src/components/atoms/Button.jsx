import React from 'react'

export default function Button({
    children = "Button"
}) {
  return (
    <button>
        {children}
    </button>
  )
}

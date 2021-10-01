import { useState, useEffect, useRef } from "react"

export const useIntersectionObserver = (ref, { threshold, root, rootMargin }) => {
  // configure the state
  let observer = useRef(null);
  const [state, setState] = useState({
    inView: false,
    triggered: false,
    entry: undefined,
  })

  useEffect(() => {
    observer.current = new IntersectionObserver(
      (entries, observerInstance) => {
        // checks to see if the element is intersecting
        if (entries[0].intersectionRatio > 0) {
          // if it is update the state, we set triggered as to not re-observe the element
          setState({
            inView: true,
            triggered: true,
            entry: observerInstance,
          })
          // unobserve the element
          observerInstance.unobserve(ref.current)
        }
        return
      },
      {
        threshold: threshold || 0,
        root: root || null,
        rootMargin: rootMargin || "0px",
      }
    )
  }, [])

  useEffect(() => {
    // check that the element exists, and has not already been triggered
    if (observer.current && ref.current && !state.triggered) {
      observer.current.observe(ref.current)
    }
  })

  return [state.inView, state.entry]
}
// import { useState, useEffect } from "react"

// export const useIntersectionObserver = (ref, { threshold, root, rootMargin }) => {
//   // configure the state
//   const [state, setState] = useState({
//     inView: false,
//     triggered: false,
//     entry: undefined,
//   })

//   const observer = new IntersectionObserver(
//     (entries, observerInstance) => {
//       // checks to see if the element is intersecting
//       if (entries[0].intersectionRatio > 0) {
//         // if it is update the state, we set triggered as to not re-observe the element
//         setState({
//           inView: true,
//           triggered: true,
//           entry: observerInstance,
//         })
//         // unobserve the element
//         observerInstance.unobserve(ref.current)
//       }
//       return
//     },
//     {
//       threshold: threshold || 0,
//       root: root || null,
//       rootMargin: rootMargin || "0px",
//     }
//   )

//   useEffect(() => {
//     // check that the element exists, and has not already been triggered
//     if (ref.current && !state.triggered) {
//       observer.observe(ref.current)
//     }
//   })

//   return [state.inView, state.entry]
// }
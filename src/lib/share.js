import store from './store'

export function shareGroup (group) {
  const users = group
    .users
    .map(({ id }) => store.state.users[id])
    .sort((a, b) => {
      return b.drinks - a.drinks
    })

  let text = `Join the group "${group.name}" to have some drinks`
  const [user1, user2, ...rest] = users

  if (user1) {
    text += ` with ${user1.name}`
  }
  if (user2) {
    text += `${rest.length ? ',' : ' and'} ${user2.name}`
  }
  if (rest.length) {
    text += ` and ${rest.length} more`
  }
  text += '!'

  const share = navigator.share({
    text,
    title: `Join the group "${group.name}" on Drink Sync`,
    url: window.location.href
  })

  share.then(() => gtag('event', 'share'))

  return share
}

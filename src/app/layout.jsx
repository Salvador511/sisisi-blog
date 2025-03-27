import Header from '~/app/Libs/SharedUI/Header/Header'
// eslint-disable-next-line react-refresh/only-export-components
export const metadata = {
  title: 'Blog',
  description: 'A blog about stuff',
}

const RootLayout = ({ children }) => (
  <html lang="en">
    <body
      style={{
        margin: 0,
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
    >
      <Header />
      <main style={{ flex: 1, display: 'flex' }}>{children}</main>
    </body>
  </html>
)

export default RootLayout

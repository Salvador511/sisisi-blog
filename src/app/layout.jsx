// eslint-disable-next-line react-refresh/only-export-components
export const metadata = {
  title: 'Blog',
  description: 'A blog about stuff',
}

const RootLayout = ({ children }) => (
  <html lang="en">
    <body style={{ margin: 0 }}>{children}</body>
  </html>
)

export default RootLayout

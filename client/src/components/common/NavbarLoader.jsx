const NavbarProgressLoader = () => {
  return (
    <div className="w-full h-1 bg-gray-200 fixed top-0 left-0 z-50">
      <div className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-progress"></div>
    </div>
  );
};

export default NavbarProgressLoader;
export default function ScrollIndicator() {
    const [showScrollDown, setShowScrollDown] = useState(true);
    const bounceAnimation = `${bounce} 2s infinite`;
    useEffect(() => {
      const handleScroll = () => {
        // Nếu đã cuộn xuống quá 100px, ẩn chỉ dẫn
        if (window.scrollY > 100) {
          setShowScrollDown(false);
        } else {
          setShowScrollDown(true);
        }
      };
  
      window.addEventListener("scroll", handleScroll);
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }, []);
  
    if (!showScrollDown) return null;
  
    return (
      <Flex
        position="absolute"
        bottom="20px"
        left="0"
        right="0"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        opacity="0.8"
        _hover={{ opacity: 1 }}
        transition="opacity 0.3s"
      >
        <Text fontSize="sm" color="gray.500" mb="2">
          Scroll Down
        </Text>
        <Box animation={bounceAnimation}>
          <ChevronDownIcon w={8} h={8} color="red.400" />
        </Box>
      </Flex>
    );
  }
  
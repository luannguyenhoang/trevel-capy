import Loading from "@/components/molecules/Loading";
import Metadata from "@/components/molecules/Metadata";
import { ScrollAnimation } from "@/components/molecules/ScrollAnimation";
import { Source } from "@/type/types";
import { useEffect, useState } from "react";
import { FaWifi, FaCar, FaSwimmingPool, FaUtensils, FaSearch, FaCalendarAlt, FaUser } from 'react-icons/fa';

export default function KhachSan() {
  const [data, setData] = useState<Source>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchParams, setSearchParams] = useState({
    checkIn: '',
    checkOut: '',
    guests: '1',
  });

//   useEffect(() => {
//     async function fetchData() {
//       try {
//         const res = await fetch("/api/khachSan");
//         if (!res.ok) {
//           throw new Error("error");
//         }
//         const result = await res.json();
//         setData(result[0]);
//       } catch (err) {
//         console.error("Error:", err);
//         setError("Có lỗi");
//       } finally {
//         setLoading(false);
//         window.scrollTo({
//           top: 0,
//           behavior: "smooth",
//         });
//       }
//     }

//     fetchData();
//   }, []);

//   if (loading) return <Loading />;
//   if (error) return <div className="text-red-500 text-center p-4">{error}</div>;

  return (
    <>
      

      {/* Hero Section */}
      <div className="z-10 relative h-[80vh] bg-cover bg-center" style={{backgroundImage: "url('/quanCafe.jpg')", zIndex: 10}}>
       
      </div>

      {/* Search Section */}
      <ScrollAnimation>
        <div className="max-w-6xl mx-auto -mt-12 px-4 z-40">
          <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="flex items-center space-x-2">
                <FaCalendarAlt className="text-gray-400" />
                <input
                  type="date"
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={searchParams.checkIn}
                  onChange={(e) => setSearchParams({...searchParams, checkIn: e.target.value})}
                />
              </div>
              <div className="flex items-center space-x-2">
                <FaCalendarAlt className="text-gray-400" />
                <input
                  type="date"
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={searchParams.checkOut}
                  onChange={(e) => setSearchParams({...searchParams, checkOut: e.target.value})}
                />
              </div>
              <div className="flex items-center space-x-2">
                <FaUser className="text-gray-400" />
                <select
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={searchParams.guests}
                  onChange={(e) => setSearchParams({...searchParams, guests: e.target.value})}
                >
                  {[1,2,3,4].map(num => (
                    <option key={num} value={num}>{num} Khách</option>
                  ))}
                </select>
              </div>
              <button className="bg-blue-600 text-white p-2 rounded flex items-center justify-center space-x-2 hover:bg-blue-700 transition">
                <FaSearch />
                <span>Tìm Phòng</span>
              </button>
            </div>
          </div>
        </div>
      </ScrollAnimation>

      {/* Features */}
      <div className="max-w-6xl mx-auto py-16 px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {[
            { icon: FaWifi, title: "WiFi Miễn Phí", desc: "Kết nối internet tốc độ cao" },
            { icon: FaCar, title: "Bãi Đỗ Xe", desc: "Bãi đỗ xe rộng rãi" },
            { icon: FaSwimmingPool, title: "Hồ Bơi", desc: "Hồ bơi vô cực view thành phố" },
            { icon: FaUtensils, title: "Nhà Hàng", desc: "Ẩm thực 5 sao" }
          ].map((feature, index) => (
            <div key={index} className="text-center p-6 bg-gray-50 rounded-lg hover:-translate-y-2 transition duration-300">
              <feature.icon className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Room List */}
      <div className="max-w-6xl mx-auto py-16 px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Phòng & Suite</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1,2,3,4,5,6].map((room) => (
            <div key={room} className="bg-white rounded-lg overflow-hidden shadow-lg hover:-translate-y-2 transition duration-300">
              <div className="h-48 overflow-hidden">
                <img 
                  src={`/images/room-${room}.jpg`} 
                  alt={`Room ${room}`}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Phòng Deluxe {room}</h3>
                <p className="text-gray-600 mb-4">Phòng sang trọng với view panorama</p>
                <div className="flex items-center space-x-4 mb-4">
                  <span className="flex items-center text-gray-500">
                    <FaWifi className="mr-2" /> WiFi
                  </span>
                  <span className="flex items-center text-gray-500">
                    <FaUtensils className="mr-2" /> Mini Bar
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-semibold">2,500,000 VNĐ/đêm</span>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
                    Đặt Ngay
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Liên Hệ Với Chúng Tôi</h2>
            <p className="text-gray-600 mb-8">Để được tư vấn và đặt phòng trực tiếp</p>
            <div className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-4">
              <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition">
                Gọi Ngay: 1800 1234
              </button>
              <button className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition">
                Chat Với Chúng Tôi
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
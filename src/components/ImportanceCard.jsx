

const ImportanceCards = () => {
  const data = [
    {
      id: 1,
      title: "Save Lives",
      description: "One single donation can save up to three lives. Your contribution is the most precious gift anyone can give.",
      icon: "❤️",
      borderColor: "border-red-500",
      iconBg: "bg-red-50"
    },
    {
      id: 2,
      title: "Health Checkup",
      description: "Donating blood regularly helps maintain healthy iron levels and reduces the risk of heart and liver diseases.",
      icon: "🩺",
      borderColor: "border-blue-500",
      iconBg: "bg-blue-50"
    },
    {
      id: 3,
      title: "Refresh Body",
      description: "It stimulates the production of new blood cells, helping your body stay healthy and function more efficiently.",
      icon: "⚡",
      borderColor: "border-green-500",
      iconBg: "bg-green-50"
    }
  ];

  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black text-gray-900 mb-4">Why Donate Blood?</h2>
          <div className="w-20 h-1.5 bg-red-600 mx-auto rounded-full"></div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {data.map((item) => (
            <div 
              key={item.id} 
              className={`bg-white p-10 rounded-3xl border-b-4 ${item.borderColor} shadow-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-2`}
            >
              <div className={`${item.iconBg} w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-8`}>
                {item.icon}
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">{item.title}</h3>
              <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImportanceCards;
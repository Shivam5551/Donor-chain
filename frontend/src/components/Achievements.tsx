const achievements = [
    { title: "Monthly Donator", completed: true },
    { title: "Weekly Donator", completed: false },
    { title: "Top at Leaderboard", completed: true },
    { title: "First Donation", completed: true },
    { title: "Consistent Donator", completed: false },
  ];

export const Achievements = ()=> {
    return (
        <div className="mt-10 bg-white shadow-lg rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-4">Coupons & Achievements</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Earned Coupons */}
            <div className=" flex  flex-col justify-start text-left">
              <h3 className="text-lg font-semibold mb-2">Earned Coupons</h3>
              <p className="text-sm text-gray-600">You have 3 discount coupons available!</p>
            </div>

            {/* Achievements */}
            <div>
              <h3 className="text-lg font-semibold mb-2">Achievements</h3>
              <ul>
                {achievements.map((achievement, index) => (
                  <li
                    key={index}
                    className={`text-sm text-left ${achievement.completed ? "text-green-600" : "text-gray-400"}`}
                  >
                    {achievement.completed ? "✅" : "⭕"} {achievement.title}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
    )
}
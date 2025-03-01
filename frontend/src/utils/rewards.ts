export const generateCoupon = (): string => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let coupon = "";
    for (let i = 0; i < 10; i++) {
      coupon += chars[Math.floor(Math.random() * chars.length)];
    }
    return `DONATE-${coupon}`;
  };
  
  export const getAchievements = (amount: number): string[] => {
    const achievements: string[] = [];
    if (amount >= 0.01) achievements.push("Supporter Badge");
    if (amount >= 0.1) achievements.push("Bronze Donor");
    if (amount >= 0.5) achievements.push("Silver Donor");
    if (amount >= 1) achievements.push("Gold Donor");
    if (amount >= 5) achievements.push("Platinum Donor");
    if (amount >= 10) achievements.push("Philanthropist Award");
    return achievements;
  };
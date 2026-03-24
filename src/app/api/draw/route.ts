import { NextResponse } from 'next/server';

// Simulates the draw algorithm logic from the PRD
export async function POST(request: Request) {
  try {
    const { logicType } = await request.json(); // 'random' or 'algo'
    
    // In a real application, we would query the active subscriptions
    // and their selected scores from Supabase here.
    const activeSubscribersCount = 1450;
    const totalPrizePool = 12500; // Mock derived from subscriptions

    // Generate 5 Winning Numbers (1-45)
    let winningNumbers: number[] = [];
    if (logicType === 'random') {
      while (winningNumbers.length < 5) {
        const num = Math.floor(Math.random() * 45) + 1;
        if (!winningNumbers.includes(num)) winningNumbers.push(num);
      }
    } else {
      // Algorithmic: Normally weighted based on frequency of user scores
      // Mock algorithmic generation
      winningNumbers = [4, 18, 22, 35, 41];
    }

    // Mock Winner Computation based on PRD Breakdown
    // 5-Match = 40%, 4-Match = 35%, 3-Match = 25%
    const match5Prize = totalPrizePool * 0.40;
    const match4Prize = totalPrizePool * 0.35;
    const match3Prize = totalPrizePool * 0.25;

    // Simulate database lookup of matching tickets
    const results = {
      drawDate: new Date().toISOString(),
      winningNumbers,
      prizePool: totalPrizePool,
      winners: {
        match5: {
          count: 1,
          totalTierPrize: match5Prize,
          perWinnerPrize: match5Prize / 1
        },
        match4: {
          count: 12,
          totalTierPrize: match4Prize,
          perWinnerPrize: match4Prize / 12
        },
        match3: {
          count: 156,
          totalTierPrize: match3Prize,
          perWinnerPrize: match3Prize / 156
        }
      },
      jackpotRolledOver: false, // Would be true if match5 count === 0
    };

    return NextResponse.json({ success: true, data: results });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

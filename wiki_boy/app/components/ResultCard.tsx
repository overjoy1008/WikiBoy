// // components/ResultCard.tsx
// interface ResultCardProps {
//     keyword: string;
//     gradientFrom: string;
//     gradientTo: string;
//   }
  
//   export const ResultCard = ({ keyword, gradientFrom, gradientTo }: ResultCardProps) => (
//     <div className="w-full p-6 rounded-xl mb-4 min-h-[200px]" 
//       style={{
//         background: `linear-gradient(135deg, ${gradientFrom}, ${gradientTo})`,
//       }}>
//       <h3 className="text-white text-lg font-semibold mb-4">{keyword}</h3>
//     </div>
//   );


// components/ResultCard.tsx
interface ResultCardProps {
  keyword: string;
  gradientFrom: string;
  gradientTo: string;
}

export const ResultCard = ({ keyword, gradientFrom, gradientTo }: ResultCardProps) => (
  <div className="w-full p-6 rounded-xl mb-4 min-h-[200px] bg-white" 
    style={{
      border: '3px solid transparent',
      backgroundImage: `linear-gradient(white, white), linear-gradient(135deg, ${gradientFrom}, ${gradientTo})`,
      backgroundOrigin: 'border-box',
      backgroundClip: 'padding-box, border-box',
    }}>
    <h3 className="text-gray-800 text-lg font-semibold mb-4">{keyword}</h3>
  </div>
);
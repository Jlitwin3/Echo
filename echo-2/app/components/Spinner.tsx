interface SpinnerProps {
  isActive: boolean;
}

export function Spinner({ isActive }: SpinnerProps) {
  return (
    <div className={`fixed top-[90px] left-0 right-0 flex justify-center z-50 transition-all duration-300 ${isActive ? 'opacity-100' : 'opacity-30'}`}>
      <div className={`spinner ${isActive ? 'active' : ''}`} style={{ width: '180px', height: '180px' }}>
        <div className="spinner1" style={{ width: '180px', height: '180px' }}></div>
      </div>
    </div>
  );
}


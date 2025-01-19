interface SpinnerProps {
  fadeOut: boolean;
}

export function Spinner({ fadeOut }: SpinnerProps) {
  return (
    <div className={`fixed top-[90px] left-0 right-0 flex justify-center z-50 transition-opacity duration-500 ${fadeOut ? 'opacity-0' : 'opacity-100'}`}>
      <div className="spinner" style={{ width: '150px', height: '150px' }}>
        <div className="spinner1" style={{ width: '150px', height: '150px' }}></div>
      </div>
    </div>
  );
}


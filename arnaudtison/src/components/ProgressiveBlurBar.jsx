export default function ProgressiveBlurBar() {
  return (
    <div className="blur-bar">
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
        <div style={{ opacity: 1, position: 'absolute', inset: 0, zIndex: 1, maskImage: 'linear-gradient(rgba(0, 0, 0, 0) 0%, rgb(0, 0, 0) 12.5%, rgb(0, 0, 0) 25%, rgba(0, 0, 0, 0) 37.5%)', pointerEvents: 'none', backdropFilter: 'blur(0.078125px)' }}></div>
        <div style={{ opacity: 1, position: 'absolute', inset: 0, zIndex: 2, maskImage: 'linear-gradient(rgba(0, 0, 0, 0) 12.5%, rgb(0, 0, 0) 25%, rgb(0, 0, 0) 37.5%, rgba(0, 0, 0, 0) 50%)', pointerEvents: 'none', backdropFilter: 'blur(0.15625px)' }}></div>
        <div style={{ opacity: 1, position: 'absolute', inset: 0, zIndex: 3, maskImage: 'linear-gradient(rgba(0, 0, 0, 0) 25%, rgb(0, 0, 0) 37.5%, rgb(0, 0, 0) 50%, rgba(0, 0, 0, 0) 62.5%)', pointerEvents: 'none', backdropFilter: 'blur(0.3125px)' }}></div>
        <div style={{ opacity: 1, position: 'absolute', inset: 0, zIndex: 4, maskImage: 'linear-gradient(rgba(0, 0, 0, 0) 37.5%, rgb(0, 0, 0) 50%, rgb(0, 0, 0) 62.5%, rgba(0, 0, 0, 0) 75%)', pointerEvents: 'none', backdropFilter: 'blur(0.625px)' }}></div>
        <div style={{ opacity: 1, position: 'absolute', inset: 0, zIndex: 5, maskImage: 'linear-gradient(rgba(0, 0, 0, 0) 50%, rgb(0, 0, 0) 62.5%, rgb(0, 0, 0) 75%, rgba(0, 0, 0, 0) 87.5%)', pointerEvents: 'none', backdropFilter: 'blur(1.25px)' }}></div>
        <div style={{ opacity: 1, position: 'absolute', inset: 0, zIndex: 6, maskImage: 'linear-gradient(rgba(0, 0, 0, 0) 62.5%, rgb(0, 0, 0) 75%, rgb(0, 0, 0) 87.5%, rgba(0, 0, 0, 0) 100%)', pointerEvents: 'none', backdropFilter: 'blur(2.5px)' }}></div>
        <div style={{ opacity: 1, position: 'absolute', inset: 0, zIndex: 7, maskImage: 'linear-gradient(rgba(0, 0, 0, 0) 75%, rgb(0, 0, 0) 87.5%, rgb(0, 0, 0) 100%)', pointerEvents: 'none', backdropFilter: 'blur(5px)' }}></div>
        <div style={{ opacity: 1, position: 'absolute', inset: 0, zIndex: 8, maskImage: 'linear-gradient(rgba(0, 0, 0, 0) 87.5%, rgb(0, 0, 0) 100%)', pointerEvents: 'none', backdropFilter: 'blur(10px)' }}></div>
      </div>
    </div>
  );
}
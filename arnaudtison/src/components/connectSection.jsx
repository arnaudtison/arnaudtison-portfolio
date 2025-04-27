import '../css/ConnectSection.scss';

function ConnectSection() {
  const connectSpan = '{ connect }';

  return (
    <div className='connect-section-wrapper'>
      <div className='connect-top-section'>
        <span>{connectSpan}</span>
      </div>
      <div className='connect-section'></div>
    </div>
  );
}

export default ConnectSection;

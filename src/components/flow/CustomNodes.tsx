import { Handle, Position } from '@xyflow/react';
import { Play, MessageCircle, List, Bot, Phone, GitBranch, Split, Image } from 'lucide-react';

const nodeContainerStyle = {
  minWidth: '220px',
  backgroundColor: '#fff',
  borderRadius: '8px',
  boxShadow: '0 4px 10px rgba(0,0,0,0.08)',
  border: '1px solid #e2e8f0',
  fontFamily: 'sans-serif',
  overflow: 'hidden',
};

const headerStyle = (bgColor: string) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  padding: '10px 12px',
  backgroundColor: bgColor,
  color: '#fff',
  fontSize: '14px',
  fontWeight: 'bold',
});

const bodyStyle = {
  padding: '12px',
  fontSize: '13px',
  color: '#475569',
};

const handleStyle = {
  width: '10px',
  height: '10px',
  background: '#fff',
  border: '2px solid #94a3b8',
};

export const StartNode = () => {
  return (
    <div style={nodeContainerStyle}>
      <div style={headerStyle('#10B981')}>
        <Play size={16} /> Start
      </div>
      <div style={bodyStyle}>Entry point of the flow</div>
      <Handle type="source" position={Position.Right} style={{ ...handleStyle, borderColor: '#10B981' }} />
    </div>
  );
};

export const MessageNode = ({ data }: any) => {
  return (
    <div style={nodeContainerStyle}>
      <Handle type="target" position={Position.Left} style={handleStyle} />
      <div style={headerStyle('#3B82F6')}>
        <MessageCircle size={16} /> Message
      </div>
      <div style={bodyStyle}>
        <div style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>{data.label || 'No message set'}</div>
      </div>
      <Handle type="source" position={Position.Right} style={{ ...handleStyle, borderColor: '#3B82F6' }} />
    </div>
  );
};

export const OptionsNode = ({ data }: any) => {
  const options = data.options || [];
  return (
    <div style={nodeContainerStyle}>
      <Handle type="target" position={Position.Left} style={handleStyle} />
      <div style={headerStyle('#8B5CF6')}>
        <List size={16} /> Options
      </div>
      <div style={{ padding: '8px' }}>
        <div style={{ fontSize: '13px', color: '#475569', marginBottom: '8px', padding: '0 4px' }}>
          {data.label || 'Choose an option:'}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {options.map((opt: any, index: number) => (
            <div key={opt.id} style={{
              position: 'relative',
              backgroundColor: '#f8fafc',
              border: '1px solid #e2e8f0',
              padding: '6px 8px',
              borderRadius: '4px',
              fontSize: '12px',
              color: '#334155'
            }}>
              {opt.label}
              <Handle
                type="source"
                position={Position.Right}
                id={opt.id}
                style={{ ...handleStyle, borderColor: '#8B5CF6', right: '-13px' }}
              />
            </div>
          ))}
        </div>
        {options.length === 0 && <Handle type="source" position={Position.Right} style={{ ...handleStyle, borderColor: '#8B5CF6' }} />}
      </div>
    </div>
  );
};

export const GeminiNode = ({ data }: any) => {
  return (
    <div style={nodeContainerStyle}>
      <Handle type="target" position={Position.Left} style={handleStyle} />
      <div style={headerStyle('#F97316')}>
        <Bot size={16} /> Gemini AI
      </div>
      <div style={bodyStyle}>
        <div>{data?.instruction ? 'Custom Instructions Active' : 'Default GenAI backend'}</div>
      </div>
    </div>
  );
};

export const WhatsAppNode = ({ data }: any) => {
  return (
    <div style={nodeContainerStyle}>
      <Handle type="target" position={Position.Left} style={handleStyle} />
      <div style={headerStyle('#22C55E')}>
        <Phone size={16} /> WhatsApp
      </div>
      <div style={bodyStyle}>
        <div>{data.phone || 'No phone set'}</div>
      </div>
    </div>
  );
};

export const ConditionNode = ({ data }: any) => {
  return (
    <div style={nodeContainerStyle}>
      <Handle type="target" position={Position.Left} style={handleStyle} />
      <div style={headerStyle('#EAB308')}>
        <GitBranch size={16} /> If-Else Condition
      </div>
      <div style={bodyStyle}>
        <div style={{ marginBottom: '8px', fontWeight: 'bold', color: '#1E293B' }}>
          {data.conditionType === 'keyword' ? 'Check Keyword' : data.conditionType === 'time' ? 'Check Business Hours' : 'Condition'}
        </div>
        <div style={{ fontSize: '11px', color: '#64748B', marginBottom: '12px' }}>
          {data.conditionType === 'keyword' ? `Keyword: "${data.keyword || ''}"` : data.conditionType === 'time' ? '08:00 - 17:00' : 'Not configured'}
        </div>
        
        <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '10px' }}>
          {/* True Handle */}
          <div style={{ textAlign: 'right', fontSize: '11px', color: '#10B981', fontWeight: 'bold', paddingRight: '8px' }}>
            True (Yes)
            <Handle type="source" position={Position.Right} id="true" style={{ ...handleStyle, borderColor: '#10B981', top: '15px' }} />
          </div>
          
          {/* False Handle */}
          <div style={{ textAlign: 'right', fontSize: '11px', color: '#EF4444', fontWeight: 'bold', paddingRight: '8px' }}>
            False (No)
            <Handle type="source" position={Position.Right} id="false" style={{ ...handleStyle, borderColor: '#EF4444', top: '45px' }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export const IntentNode = ({ data }: any) => {
  const intents = data.intents || [];
  return (
    <div style={nodeContainerStyle}>
      <Handle type="target" position={Position.Left} style={handleStyle} />
      <div style={headerStyle('#8B5CF6')}>
        <Split size={16} /> Intent Router
      </div>
      <div style={{ padding: '12px' }}>
        <div style={{ fontSize: '13px', color: '#475569', marginBottom: '8px', fontWeight: 'bold' }}>
          {data.label || 'Route by User Text'}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {intents.map((intent: any) => (
            <div key={intent.id} style={{
              position: 'relative',
              backgroundColor: '#f8fafc',
              border: '1px solid #e2e8f0',
              padding: '6px 8px',
              borderRadius: '4px',
              fontSize: '12px',
              color: '#334155'
            }}>
              <div style={{ fontWeight: 'bold' }}>{intent.name}</div>
              <div style={{ fontSize: '10px', color: '#94a3b8', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {intent.keywords}
              </div>
              <Handle
                type="source"
                position={Position.Right}
                id={intent.id}
                style={{ ...handleStyle, borderColor: '#8B5CF6', right: '-13px' }}
              />
            </div>
          ))}
          
          <div style={{
            position: 'relative',
            backgroundColor: '#fee2e2',
            border: '1px solid #fecaca',
            padding: '6px 8px',
            borderRadius: '4px',
            fontSize: '12px',
            color: '#b91c1c',
            marginTop: '4px'
          }}>
            <div style={{ fontWeight: 'bold' }}>Fallback</div>
            <div style={{ fontSize: '10px', color: '#f87171' }}>No match</div>
            <Handle
              type="source"
              position={Position.Right}
              id="fallback"
              style={{ ...handleStyle, borderColor: '#ef4444', right: '-13px' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export const ImageNode = ({ data }: any) => {
  return (
    <div style={nodeContainerStyle}>
      <Handle type="target" position={Position.Left} style={handleStyle} />
      <div style={headerStyle('#06B6D4')}>
        <Image size={16} /> Image Output
      </div>
      <div style={bodyStyle}>
        <div style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word', fontSize: '11px', color: '#64748B' }}>
          {data.imageUrl ? data.imageUrl : 'No image URL set'}
        </div>
      </div>
      <Handle type="source" position={Position.Right} style={{ ...handleStyle, borderColor: '#06B6D4' }} />
    </div>
  );
};

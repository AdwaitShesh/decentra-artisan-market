import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { ArrowLeft, Download, Palette, Eraser, Square, Circle, PaintBucket, Check } from "lucide-react";

const DigitalArt = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [currentColor, setCurrentColor] = useState('#FF6B9D');
    const [brushSize, setBrushSize] = useState(5);
    const [brushType, setBrushType] = useState<'round' | 'square' | 'eraser' | 'fill'>('round');
    const [timeSpent, setTimeSpent] = useState(0);
    const [pixelArtMode, setPixelArtMode] = useState(false);
    const [pixelGridSize, setPixelGridSize] = useState(32);
    const [pixelGrid, setPixelGrid] = useState(Array.from({ length: 32 }, () => Array(32).fill('#fff')));
    const [isPixelDrawing, setIsPixelDrawing] = useState(false);
    const [colorPicked, setColorPicked] = useState(false);
    const [pixelBrush, setPixelBrush] = useState<'color' | 'eraser' | 'fill'>('color');

    const [history, setHistory] = useState<ImageData[]>([]);
    const [pixelHistory, setPixelHistory] = useState<string[][][]>([]);
    const [historyStep, setHistoryStep] = useState(-1);

    const [canvasSize, setCanvasSize] = useState({ width: 800, height: 600 });
    const [tempSize, setTempSize] = useState({ width: 800, height: 600 });

    const navigate = useNavigate();
    const { toast } = useToast();

    const colors = [
        '#FF6B9D', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7',
        '#DDA0DD', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E9',
        '#000000', '#FFFFFF', '#FF0000', '#00FF00', '#0000FF'
    ];

    const brushTypes = [
        { type: 'round' as const, icon: <Circle className="h-4 w-4" />, name: 'Round' },
        { type: 'square' as const, icon: <Square className="h-4 w-4" />, name: 'Square' },
        { type: 'eraser' as const, icon: <Eraser className="h-4 w-4" />, name: 'Eraser' },
        { type: 'fill' as const, icon: <PaintBucket className="h-4 w-4" />, name: 'Fill' },
    ];

    // Pixel art tool types for UI (with icons)
    const pixelBrushTypes = [
        { type: 'color' as const, icon: <Palette className="h-4 w-4" />, name: 'Draw' },
        { type: 'eraser' as const, icon: <Eraser className="h-4 w-4" />, name: 'Eraser' },
        { type: 'fill' as const, icon: <PaintBucket className="h-4 w-4" />, name: 'Fill' },
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeSpent(prev => prev + 1);
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    // Initialize canvas when size changes
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Save current content if any
        const tempCanvas = document.createElement('canvas');
        tempCanvas.width = canvas.width;
        tempCanvas.height = canvas.height;
        const tempCtx = tempCanvas.getContext('2d');
        if (tempCtx) {
            tempCtx.drawImage(canvas, 0, 0);
        }

        // Resize
        canvas.width = canvasSize.width;
        canvas.height = canvasSize.height;

        // Fill with white background
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Restore content (centered or top-left)
        // For now, let's just clear it to avoid artifacts on resize, or we could try to preserve
        // But usually resizing a canvas clears it in simple apps. 
        // Let's keep it simple: resizing clears the canvas for a fresh start with new dimensions.
        // If we wanted to keep content we'd need to handle scaling or cropping.

        // Re-fill white after resize
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Reset history on resize
        setHistory([]);
        setHistoryStep(-1);
        saveCanvasState(); // Save initial blank state

    }, [canvasSize]);

    const saveCanvasState = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

        setHistory(prev => {
            const newHistory = prev.slice(0, historyStep + 1);
            return [...newHistory, imageData];
        });
        setHistoryStep(prev => prev + 1);
    };

    const savePixelState = () => {
        const newGrid = pixelGrid.map(row => [...row]);
        setPixelHistory(prev => {
            const newHistory = prev.slice(0, historyStep + 1);
            return [...newHistory, newGrid];
        });
        setHistoryStep(prev => prev + 1);
    };

    // Initialize pixel history
    useEffect(() => {
        if (pixelArtMode && pixelHistory.length === 0) {
            savePixelState();
        }
    }, [pixelArtMode]);


    const handleUndo = () => {
        if (historyStep <= 0) return;

        if (pixelArtMode) {
            const previousGrid = pixelHistory[historyStep - 1];
            if (previousGrid) {
                setPixelGrid(previousGrid);
                setHistoryStep(prev => prev - 1);
            }
        } else {
            const canvas = canvasRef.current;
            if (!canvas) return;
            const ctx = canvas.getContext('2d');
            if (!ctx) return;

            const previousState = history[historyStep - 1];
            if (previousState) {
                ctx.putImageData(previousState, 0, 0);
                setHistoryStep(prev => prev - 1);
            }
        }
    };

    const handleResizeApply = () => {
        if (tempSize.width < 100 || tempSize.height < 100) {
            toast({
                title: "Invalid Size",
                description: "Minimum size is 100x100 pixels.",
                variant: "destructive"
            });
            return;
        }
        if (tempSize.width > 2000 || tempSize.height > 2000) {
            toast({
                title: "Invalid Size",
                description: "Maximum size is 2000x2000 pixels.",
                variant: "destructive"
            });
            return;
        }
        setCanvasSize(tempSize);
        toast({
            title: "Canvas Resized",
            description: `New dimensions: ${tempSize.width}x${tempSize.height}. Canvas cleared.`,
        });
    };

    // Flood fill algorithm
    function floodFill(x: number, y: number, fillColor: string, tolerance = 128) {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        saveCanvasState(); // Save before fill

        const width = canvas.width;
        const height = canvas.height;
        const imageData = ctx.getImageData(0, 0, width, height);
        const data = imageData.data;
        const MAX_PIXELS = 1000000; // Increased limit

        // Convert fillColor to RGBA
        function hexToRgba(hex: string) {
            let c = hex.replace('#', '');
            if (c.length === 3) c = c[0] + c[0] + c[1] + c[1] + c[2] + c[2];
            const num = parseInt(c, 16);
            return [
                (num >> 16) & 255,
                (num >> 8) & 255,
                num & 255,
                255
            ];
        }
        const targetIdx = (y * width + x) * 4;
        const targetColor = [data[targetIdx], data[targetIdx + 1], data[targetIdx + 2], data[targetIdx + 3]];
        const replacementColor = hexToRgba(fillColor);

        // If already filled, return
        if (Math.abs(targetColor[0] - replacementColor[0]) < 5 &&
            Math.abs(targetColor[1] - replacementColor[1]) < 5 &&
            Math.abs(targetColor[2] - replacementColor[2]) < 5) return;

        // Improved color match: Euclidean distance in RGBA space
        function colorMatch(a: number[], b: number[], tol: number) {
            const dr = a[0] - b[0];
            const dg = a[1] - b[1];
            const db = a[2] - b[2];
            const da = a[3] - b[3];
            return Math.sqrt(dr * dr + dg * dg + db * db + da * da) <= tol;
        }

        // 4-way neighbor directions (safer for flood fill)
        const directions = [
            [-1, 0], [1, 0], [0, -1], [0, 1]
        ];

        // Main flood fill
        const stack = [[x, y]];
        const filled = new Set();
        let filledCount = 0;

        while (stack.length && filledCount < MAX_PIXELS) {
            const [cx, cy] = stack.pop()!;
            if (cx < 0 || cx >= width || cy < 0 || cy >= height) continue;

            const key = cy * width + cx;
            if (filled.has(key)) continue;

            const idx = key * 4;
            const color = [data[idx], data[idx + 1], data[idx + 2], data[idx + 3]];

            if (!colorMatch(color, targetColor, tolerance)) continue;

            data[idx] = replacementColor[0];
            data[idx + 1] = replacementColor[1];
            data[idx + 2] = replacementColor[2];
            data[idx + 3] = replacementColor[3];

            filled.add(key);
            filledCount++;

            for (const [dx, dy] of directions) {
                stack.push([cx + dx, cy + dy]);
            }
        }

        ctx.putImageData(imageData, 0, 0);
    }

    // Pixel art handlers
    const handlePixelClick = (row: number, col: number) => {
        // Save state before modification
        // Optimization: We should probably save state on mouse down, not every click/drag step if dragging
        // But for click it's fine. For drag, we handle in MouseDown

        if (pixelBrush === 'fill') {
            savePixelState();
            // Flood fill for pixel art grid
            const targetColor = pixelGrid[row][col];
            if (targetColor === currentColor) return;

            const newGrid = pixelGrid.map(arr => arr.slice());
            const stack = [[row, col]];
            const directions = [[0, 1], [1, 0], [0, -1], [-1, 0]];
            const visited = new Set();

            while (stack.length) {
                const [r, c] = stack.pop()!;
                const key = `${r},${c}`;

                if (
                    r < 0 || r >= pixelGridSize ||
                    c < 0 || c >= pixelGridSize ||
                    visited.has(key) ||
                    newGrid[r][c] !== targetColor
                ) continue;

                visited.add(key);
                newGrid[r][c] = currentColor;

                for (const [dr, dc] of directions) {
                    stack.push([r + dr, c + dc]);
                }
            }
            setPixelGrid(newGrid);
            return;
        }

        setPixelGrid(grid => {
            const newGrid = grid.map(arr => arr.slice());
            newGrid[row][col] = pixelBrush === 'eraser' ? '#fff' : currentColor;
            return newGrid;
        });
    };

    const handlePixelMouseDown = (row: number, col: number) => {
        savePixelState(); // Save before starting a stroke
        setIsPixelDrawing(true);
        handlePixelClick(row, col);
    };

    const handlePixelMouseOver = (row: number, col: number) => {
        if (isPixelDrawing) {
            // We don't save state on every pixel during drag, just the initial state
            // But we need to update the grid
            setPixelGrid(grid => {
                const newGrid = grid.map(arr => arr.slice());
                newGrid[row][col] = pixelBrush === 'eraser' ? '#fff' : currentColor;
                return newGrid;
            });
        }
    };

    const handlePixelMouseUp = () => setIsPixelDrawing(false);

    const clearPixelGrid = () => {
        savePixelState();
        setPixelGrid(Array.from({ length: pixelGridSize }, () => Array(pixelGridSize).fill('#fff')));
    };

    const getCanvasCoordinates = (e: React.MouseEvent<HTMLCanvasElement>) => {
        const canvas = canvasRef.current;
        if (!canvas) return { x: 0, y: 0 };

        const rect = canvas.getBoundingClientRect();
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;

        return {
            x: Math.floor((e.clientX - rect.left) * scaleX),
            y: Math.floor((e.clientY - rect.top) * scaleY)
        };
    };

    const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
        const { x, y } = getCanvasCoordinates(e);

        if (brushType === 'fill') {
            floodFill(x, y, currentColor, 64);
            return;
        }

        saveCanvasState(); // Save before stroke

        setIsDrawing(true);
        draw(e);
    };

    const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
        if (!isDrawing) return;

        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const { x, y } = getCanvasCoordinates(e);

        if (brushType === 'eraser') {
            ctx.globalCompositeOperation = 'destination-out'; // This makes it transparent
            // For white eraser effect on white background, we can just draw white
            ctx.globalCompositeOperation = 'source-over';
            ctx.fillStyle = 'white';
            ctx.beginPath();
            ctx.arc(x, y, brushSize, 0, 2 * Math.PI);
            ctx.fill();
        } else {
            ctx.globalCompositeOperation = 'source-over';
            ctx.fillStyle = currentColor;

            if (brushType === 'round') {
                ctx.beginPath();
                ctx.arc(x, y, brushSize, 0, 2 * Math.PI);
                ctx.fill();
            } else if (brushType === 'square') {
                ctx.fillRect(x - brushSize, y - brushSize, brushSize * 2, brushSize * 2);
            }
        }
    };

    const stopDrawing = () => {
        setIsDrawing(false);
    };

    const clearCanvas = () => {
        saveCanvasState();
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

    const handleGridSizeChange = (size: number) => {
        setPixelGridSize(size);
        setPixelGrid(Array.from({ length: size }, () => Array(size).fill('#fff')));
        setPixelHistory([]); // Reset history on grid size change
        setHistoryStep(-1);
    };

    // Color helpers
    function rgbToHex(r: number, g: number, b: number) {
        return (
            '#' +
            [r, g, b]
                .map(x => {
                    const hex = x.toString(16);
                    return hex.length === 1 ? '0' + hex : hex;
                })
                .join('')
        );
    }

    function hexToRgb(hex: string) {
        let c = hex.replace('#', '');
        if (c.length === 3) c = c[0] + c[0] + c[1] + c[1] + c[2] + c[2];
        const num = parseInt(c, 16);
        return [
            (num >> 16) & 255,
            (num >> 8) & 255,
            num & 255
        ];
    }

    function isValidHex(hex: string) {
        return /^#([0-9A-Fa-f]{6}|[0-9A-Fa-f]{3})$/.test(hex);
    }

    function isValidRgb(rgb: string) {
        return /^\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*$/.test(rgb);
    }

    const rgbString = (() => {
        try {
            const [r, g, b] = hexToRgb(currentColor);
            return `${r}, ${g}, ${b}`;
        } catch {
            return '255, 255, 255';
        }
    })();

    const setColor = (color: string) => {
        setCurrentColor(color);
        setColorPicked(true);
    };

    // Action handlers
    const handleDownload = () => {
        if (pixelArtMode) {
            // Convert pixel grid to image
            const canvas = document.createElement('canvas');
            canvas.width = pixelGridSize * 10; // Scale up for better visibility
            canvas.height = pixelGridSize * 10;
            const ctx = canvas.getContext('2d');
            if (!ctx) return;

            pixelGrid.forEach((row, r) => {
                row.forEach((color, c) => {
                    ctx.fillStyle = color;
                    ctx.fillRect(c * 10, r * 10, 10, 10);
                });
            });

            const link = document.createElement('a');
            link.download = `pixel-art-${Date.now()}.png`;
            link.href = canvas.toDataURL();
            link.click();
        } else {
            const canvas = canvasRef.current;
            if (!canvas) return;

            const link = document.createElement('a');
            link.download = `digital-art-${Date.now()}.png`;
            link.href = canvas.toDataURL();
            link.click();
        }

        toast({
            title: "Artwork Downloaded",
            description: "Your masterpiece has been saved to your device!",
        });
    };

    const handleMint = async () => {
        let blob: Blob | null = null;
        let previewUrl: string = '';

        if (pixelArtMode) {
            // Convert pixel grid to blob
            const canvas = document.createElement('canvas');
            canvas.width = 512; // Standard size for NFT
            canvas.height = 512;
            const ctx = canvas.getContext('2d');
            if (!ctx) return;

            // Draw white background first
            ctx.fillStyle = 'white';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            const pixelSize = canvas.width / pixelGridSize;

            pixelGrid.forEach((row, r) => {
                row.forEach((color, c) => {
                    ctx.fillStyle = color;
                    ctx.fillRect(c * pixelSize, r * pixelSize, pixelSize, pixelSize);
                });
            });

            previewUrl = canvas.toDataURL('image/png');
            blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/png'));
        } else {
            const canvas = canvasRef.current;
            if (!canvas) return;

            previewUrl = canvas.toDataURL('image/png');
            blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/png'));
        }

        if (blob) {
            // Create a File object from the Blob
            const file = new File([blob], `art-${Date.now()}.png`, { type: 'image/png' });

            navigate('/create/mint', {
                state: {
                    file: file,
                    preview: previewUrl
                }
            });
        }
    };

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Navbar />

            <main className="flex-grow container mx-auto px-4 py-8">
                <div className="mb-6 flex items-center justify-between">
                    <Button variant="ghost" onClick={() => navigate('/release/start')} className="gap-2">
                        <ArrowLeft className="h-4 w-4" /> Back
                    </Button>
                    <h1 className="text-3xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
                        Digital Art Studio
                    </h1>
                    <div className="w-[100px]"></div> {/* Spacer for centering */}
                </div>

                <div className="bg-card border rounded-3xl p-6 shadow-xl max-w-7xl mx-auto">
                    <div className="flex flex-col lg:flex-row gap-8">

                        {/* Tools Sidebar */}
                        <div className="w-full lg:w-64 flex flex-col gap-6">
                            {/* Mode Switcher */}
                            <div className="bg-muted/50 p-4 rounded-xl">
                                <p className="text-sm font-medium mb-3 text-muted-foreground">Canvas Mode</p>
                                <div className="flex gap-2">
                                    <Button
                                        variant={!pixelArtMode ? "default" : "outline"}
                                        onClick={() => setPixelArtMode(false)}
                                        className="flex-1 text-xs"
                                        size="sm"
                                    >
                                        Canvas
                                    </Button>
                                    <Button
                                        variant={pixelArtMode ? "default" : "outline"}
                                        onClick={() => setPixelArtMode(true)}
                                        className="flex-1 text-xs"
                                        size="sm"
                                    >
                                        Pixel Art
                                    </Button>
                                </div>
                            </div>

                            {/* Canvas Size Settings */}
                            {!pixelArtMode && (
                                <div className="bg-muted/50 p-4 rounded-xl">
                                    <p className="text-sm font-medium mb-3 text-muted-foreground">Canvas Size (px)</p>
                                    <div className="flex gap-2 mb-2">
                                        <div className="flex-1">
                                            <label className="text-[10px] text-muted-foreground">Width</label>
                                            <input
                                                type="number"
                                                value={tempSize.width}
                                                onChange={(e) => setTempSize(prev => ({ ...prev, width: parseInt(e.target.value) || 0 }))}
                                                className="w-full p-1 text-xs border rounded"
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <label className="text-[10px] text-muted-foreground">Height</label>
                                            <input
                                                type="number"
                                                value={tempSize.height}
                                                onChange={(e) => setTempSize(prev => ({ ...prev, height: parseInt(e.target.value) || 0 }))}
                                                className="w-full p-1 text-xs border rounded"
                                            />
                                        </div>
                                    </div>
                                    <Button
                                        size="sm"
                                        className="w-full text-xs"
                                        variant="secondary"
                                        onClick={handleResizeApply}
                                    >
                                        Apply Size
                                    </Button>
                                </div>
                            )}

                            {/* Brush Tools */}
                            <div className="bg-muted/50 p-4 rounded-xl">
                                <p className="text-sm font-medium mb-3 text-muted-foreground">Tools</p>
                                <div className="grid grid-cols-2 gap-2">
                                    {(pixelArtMode ? pixelBrushTypes : brushTypes).map((brush) => (
                                        <Button
                                            key={brush.type}
                                            variant={(pixelArtMode ? pixelBrush === brush.type : brushType === brush.type) ? "default" : "outline"}
                                            onClick={() => pixelArtMode ? setPixelBrush(brush.type as any) : setBrushType(brush.type as any)}
                                            className="justify-start gap-2"
                                            size="sm"
                                        >
                                            {brush.icon}
                                            {brush.name}
                                        </Button>
                                    ))}
                                </div>
                            </div>

                            {/* Size Slider */}
                            {!pixelArtMode && (
                                <div className="bg-muted/50 p-4 rounded-xl">
                                    <p className="text-sm font-medium mb-3 text-muted-foreground">
                                        Size: {brushSize}px
                                    </p>
                                    <input
                                        type="range"
                                        min="2"
                                        max="50"
                                        value={brushSize}
                                        onChange={(e) => setBrushSize(Number(e.target.value))}
                                        className="w-full accent-primary"
                                    />
                                </div>
                            )}

                            {/* Grid Size for Pixel Art */}
                            {pixelArtMode && (
                                <div className="bg-muted/50 p-4 rounded-xl">
                                    <p className="text-sm font-medium mb-3 text-muted-foreground">Grid Size</p>
                                    <div className="flex gap-2">
                                        {[16, 32, 64].map(size => (
                                            <Button
                                                key={size}
                                                variant={pixelGridSize === size ? "default" : "outline"}
                                                onClick={() => handleGridSizeChange(size)}
                                                className="flex-1 text-xs"
                                                size="sm"
                                            >
                                                {size}x
                                            </Button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Main Canvas Area */}
                        <div className="flex-1 flex flex-col items-center bg-muted/10 rounded-xl p-4 overflow-auto border border-white/10">
                            <div className="relative bg-white shadow-2xl overflow-hidden">
                                {pixelArtMode ? (
                                    <div
                                        style={{
                                            width: 600,
                                            height: 600,
                                            display: 'grid',
                                            gridTemplateRows: `repeat(${pixelGridSize}, 1fr)`,
                                            gridTemplateColumns: `repeat(${pixelGridSize}, 1fr)`,
                                            cursor: pixelBrush === 'eraser' ? 'crosshair' : 'cell'
                                        }}
                                        onMouseLeave={handlePixelMouseUp}
                                        className="bg-white max-w-full aspect-square"
                                    >
                                        {pixelGrid.map((row, rIdx) =>
                                            row.map((color, cIdx) => (
                                                <div
                                                    key={`${rIdx}-${cIdx}`}
                                                    style={{ backgroundColor: color }}
                                                    className="border-[0.5px] border-gray-100"
                                                    onMouseDown={() => handlePixelMouseDown(rIdx, cIdx)}
                                                    onMouseOver={() => handlePixelMouseOver(rIdx, cIdx)}
                                                    onMouseUp={handlePixelMouseUp}
                                                />
                                            ))
                                        )}
                                    </div>
                                ) : (
                                    <canvas
                                        ref={canvasRef}
                                        width={canvasSize.width}
                                        height={canvasSize.height}
                                        onMouseDown={startDrawing}
                                        onMouseMove={draw}
                                        onMouseUp={stopDrawing}
                                        onMouseLeave={stopDrawing}
                                        className="cursor-crosshair touch-none shadow-sm"
                                        style={{ maxWidth: '100%', maxHeight: '80vh' }}
                                    />
                                )}
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-4 mt-6 w-full max-w-lg">
                                <Button
                                    variant="outline"
                                    onClick={handleUndo}
                                    disabled={historyStep <= 0}
                                    className="flex-1"
                                >
                                    Undo
                                </Button>
                                <Button
                                    variant="outline"
                                    onClick={pixelArtMode ? clearPixelGrid : clearCanvas}
                                    className="flex-1"
                                >
                                    Clear
                                </Button>
                                <Button
                                    variant="secondary"
                                    onClick={handleDownload}
                                    className="flex-1 gap-2"
                                >
                                    <Download className="h-4 w-4" /> Download
                                </Button>
                                <Button
                                    onClick={handleMint}
                                    className="flex-1 gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                                >
                                    Mint NFT <ArrowLeft className="h-4 w-4 rotate-180" />
                                </Button>
                            </div>
                        </div>

                        {/* Color Palette Sidebar */}
                        <div className="w-full lg:w-64">
                            <div className="bg-muted/50 p-4 rounded-xl h-full">
                                <p className="text-sm font-medium mb-3 text-muted-foreground">Colors</p>

                                <div className="grid grid-cols-5 gap-2 mb-4">
                                    {colors.map((color) => (
                                        <button
                                            key={color}
                                            onClick={() => setColor(color)}
                                            className={`w-8 h-8 rounded-full border-2 transition-all ${currentColor === color ? 'border-primary scale-110 shadow-md' : 'border-transparent hover:scale-105'
                                                }`}
                                            style={{ backgroundColor: color }}
                                            title={color}
                                        />
                                    ))}
                                </div>

                                <div className="space-y-4 pt-4 border-t border-border">
                                    <div>
                                        <label className="text-xs text-muted-foreground block mb-1">Custom Color</label>
                                        <div className="flex gap-2">
                                            <input
                                                type="color"
                                                value={isValidHex(currentColor) ? currentColor : '#000000'}
                                                onChange={e => setColor(e.target.value)}
                                                className="h-9 w-full cursor-pointer rounded border p-1"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="text-xs text-muted-foreground block mb-1">Hex Code</label>
                                        <input
                                            type="text"
                                            value={currentColor}
                                            onChange={e => {
                                                const val = e.target.value;
                                                if (isValidHex(val)) setColor(val);
                                                else setCurrentColor(val); // Allow typing
                                            }}
                                            className="w-full px-3 py-2 rounded-md border text-sm bg-background"
                                            placeholder="#000000"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default DigitalArt;

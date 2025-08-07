
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';

interface EvaluationCategory {
  id: string;
  name: string;
  emoji: string;
  description: string;
  maxPoints: number;
}

interface Interview {
  candidate: string;
  totalScore?: number;
  evaluation?: {
    scores?: Record<string, number>;
    notes?: Record<string, string>;
    recommendation?: string;
    finalNotes?: string;
  };
}

interface InterviewEvaluationDialogProps {
  selectedInterview: Interview | null;
  isEditMode: boolean;
  setIsEditMode: (value: boolean) => void;
  evaluationCategories: EvaluationCategory[];
  evaluationScores: Record<string, number>;
  evaluationNotes: Record<string, string>;
  recommendation: string;
  finalNotes: string;
  setRecommendation: (value: string) => void;
  setFinalNotes: (value: string) => void;
  handleScoreChange: (categoryId: string, value: string) => void;
  handleNoteChange: (categoryId: string, value: string) => void;
  handleSaveEvaluation: () => void;
  getTotalScore: () => number;
  getScorePercentage: (score: number, maxPoints: number) => number;
  getProgressColor: (percentage: number) => string;
}

const InterviewEvaluationDialog: React.FC<InterviewEvaluationDialogProps> = ({
  selectedInterview,
  isEditMode,
  setIsEditMode,
  evaluationCategories,
  evaluationScores,
  evaluationNotes,
  recommendation,
  finalNotes,
  setRecommendation,
  setFinalNotes,
  handleScoreChange,
  handleNoteChange,
  handleSaveEvaluation,
  getTotalScore,
  getScorePercentage,
  getProgressColor,
}) => {
  return (
    <Dialog>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader className="border-b pb-4 flex-shrink-0">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-bold">
              Interview Evaluation - {selectedInterview?.candidate}
            </DialogTitle>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-lg font-bold text-primary">
                  Total Score: {isEditMode ? getTotalScore() : selectedInterview?.totalScore || 0}/100
                </p>
                <p className="text-sm text-muted-foreground">
                  {((isEditMode ? getTotalScore() : selectedInterview?.totalScore || 0) / 100 * 100).toFixed(1)}%
                </p>
              </div>
              <Button
                variant={isEditMode ? "outline" : "default"}
                size="sm"
                onClick={() => setIsEditMode(!isEditMode)}
              >
                {isEditMode ? "Cancel Edit" : "Edit Evaluation"}
              </Button>
            </div>
          </div>
        </DialogHeader>
        
        <div className="flex-1 overflow-y-auto p-4">
          <div className="space-y-4">
            {evaluationCategories.map((category) => {
              const score = isEditMode ? (evaluationScores[category.id] || 0) : (selectedInterview?.evaluation?.scores?.[category.id] || 0);
              const percentage = getScorePercentage(score, category.maxPoints);
              const note = isEditMode ? (evaluationNotes[category.id] || "") : (selectedInterview?.evaluation?.notes?.[category.id] || "");
              
              return (
                <div key={category.id} className="bg-muted/50 rounded-lg p-4 border">
                  <div className="flex items-center gap-4">
                    <span className="text-2xl">{category.emoji}</span>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium text-foreground">
                          {category.name}
                        </h3>
                        <div className="text-right">
                          <span className="text-sm font-medium text-foreground">
                            {score}/{category.maxPoints} pts
                          </span>
                          <span className="text-sm text-muted-foreground ml-2">
                            ({percentage.toFixed(0)}%)
                          </span>
                        </div>
                      </div>
                      
                      <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                        <div
                          className={`h-2 rounded-full transition-all duration-300 ${getProgressColor(percentage)}`}
                          style={{ width: `${percentage}%` }}
                        />
                      </div>

                      <p className="text-xs text-muted-foreground mb-3">
                        {category.description}
                      </p>

                      {isEditMode ? (
                        <div className="flex gap-4">
                          <Input
                            type="number"
                            min="0"
                            max={category.maxPoints}
                            value={score}
                            onChange={(e) => handleScoreChange(category.id, e.target.value)}
                            className="w-24"
                            placeholder="Score"
                          />
                          <Textarea
                            value={note}
                            onChange={(e) => handleNoteChange(category.id, e.target.value)}
                            placeholder="Add notes..."
                            className="flex-1 resize-none"
                            rows={2}
                          />
                        </div>
                      ) : (
                        note && (
                          <p className="text-sm text-foreground bg-background p-3 rounded border">
                            {note}
                          </p>
                        )
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
            
            {/* Final Recommendation */}
            <div className="bg-primary/10 rounded-lg p-4 border border-primary/20">
              <h3 className="font-semibold text-primary mb-2">Final Recommendation</h3>
              {isEditMode ? (
                <div className="space-y-3">
                  <div>
                    <Label htmlFor="recommendation">Recommendation</Label>
                    <Input
                      id="recommendation"
                      value={recommendation}
                      onChange={(e) => setRecommendation(e.target.value)}
                      placeholder="Enter recommendation..."
                    />
                  </div>
                  <div>
                    <Label htmlFor="final-notes">Final Notes</Label>
                    <Textarea
                      id="final-notes"
                      value={finalNotes}
                      onChange={(e) => setFinalNotes(e.target.value)}
                      placeholder="Add final notes..."
                      rows={3}
                    />
                  </div>
                </div>
              ) : (
                <>
                  {selectedInterview?.evaluation?.recommendation && (
                    <p className="text-sm text-foreground mb-2">
                      <strong>Recommendation:</strong> {selectedInterview.evaluation.recommendation}
                    </p>
                  )}
                  {selectedInterview?.evaluation?.finalNotes && (
                    <p className="text-sm text-foreground">
                      <strong>Notes:</strong> {selectedInterview.evaluation.finalNotes}
                    </p>
                  )}
                </>
              )}
            </div>
            
            {isEditMode && (
              <div className="mt-6 flex justify-end gap-4 sticky bottom-0 bg-background p-4 border-t">
                <Button
                  variant="outline"
                  onClick={() => setIsEditMode(false)}
                >
                  Cancel
                </Button>
                <Button onClick={handleSaveEvaluation}>
                  Save Evaluation
                </Button>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default InterviewEvaluationDialog;
<?php

namespace App\Events;

use ApiPlatform\Core\EventListener\EventPriorities;
use App\Entity\Score;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpKernel\Event\ViewEvent;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\Security\Core\Security;

class ScoreUserSubscriber implements EventSubscriberInterface
{
    /**
     * @var Security
     */
    private $security;

    /**
     * BookUserSubscriber constructor.
     * @param Security $security
     */
    public function __construct(Security $security)
    {
        $this->security = $security;
    }

    public static function getSubscribedEvents()
    {
        return [
            KernelEvents::VIEW => ['setUserForScore', EventPriorities::PRE_VALIDATE]
        ];
    }

    public function setUserForScore(ViewEvent $event)
    {
        $score = $event->getControllerResult();
        $method = $event->getRequest()->getMethod();
        $user = $this->security->getUser();

        if ($score instanceof Score && $method === 'POST') {
            $score->setUser($user);
            $score->setCreatedAt(new \DateTime());
        }
        if ($score instanceof Score && $method === 'PUT') {
            $score->setUpdatedAt(new \DateTime());
        }
    }
}